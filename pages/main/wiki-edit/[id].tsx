import {
  useState,
  useCallback,
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
} from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { getArticleReadData } from 'lib/main/wiki/getWikiData';
import { useAppDispatch, useAppSelector } from 'hooks/reduxStoreHooks';
import { store } from 'store/store';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import { WikiEdit, Summary } from 'containers/main/wiki/edit';
import { LargeText } from 'components/global';
import {
  createCollectionJSON,
  keyInfoValidationErrorHandler,
} from 'components/main/wiki/edit/KeyInfo/utils';

export default function WikiEditPage({
  document,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAdmin, isTester } = useAppSelector(({ account }) => account);

  if (!document) {
    router.push('/main/recent-edits');
    return (
      <LargeText>There's no such document you are trying to edit.</LargeText>
    );
  }

  useEffect(() => {
    setTimeout(() => {
      const { isAdmin: _isAdmin, isTester: _isTester } = (
        store.getState() as ReduxState.RootStateType
      ).account;
      if (!(_isAdmin || _isTester)) {
        alert(
          "You don't have a right to edit the article yet.\r\nAsk Sigmate team for permission on our discord."
        );
        router.back();
      }
    }, 700);
  }, []);

  const [title, setTitle] = useState(document.title);
  const [selectedOption, setSelectedOption] = useState<
    ReactSelect.OptionType[]
  >(
    document.types?.map((type) => ({
      value: type.id.toString(10),
      label: type.name,
    })) || []
  );
  const [blocks, setBlocks] = useState<Wiki.DocumentBlockType[]>(() => {
    const initBlocks: Wiki.DocumentBlockType[] = [];
    if (document.blocks) {
      const flattenBlocks = Object.values(document.blocks);
      document.structure?.forEach((blockID) => {
        const curBlock = flattenBlocks.find((block) => block.id === blockID);
        if (curBlock) initBlocks.push(curBlock);
      });
    }
    return initBlocks;
  });
  const [summary, setSummary] = useState('');
  const [pending, setPending] = useState<boolean>(false);

  const onChangeTypes: ReactSelect.MultiSelectChangeEventHandler = useCallback(
    (selected) => {
      if (selected) {
        setSelectedOption(selected.concat());
      }
    },
    []
  );

  const onSummaryChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => setSummary(e.target.value),
    []
  );

  const onSave: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      setPending(true);
      let collection: Wiki.EditableKeyInfosType = {};
      e.preventDefault();
      const { id } = document;
      const { elements } = e.currentTarget;

      if (document.keyInfo) collection = createCollectionJSON(elements);
      if (title === '') {
        setPending(false);
        alert('A wiki document should have a title.');
        (elements.namedItem('Title') as HTMLButtonElement).focus();
        return;
      }
      if (blocks.length === 0) {
        setPending(false);
        alert('A wiki document must have contents.');
        return;
      }
      dispatch(
        AuthRequiredAxios({
          method: 'PATCH',
          url: `/wiki/d/${id}`,
          data: {
            document: {
              title,
              categories: selectedOption.map((selected) => selected.value),
              blocks,
            },
            collection,
          },
        })
      ).then(async (action: any) => {
        if (action.payload.status === 200) {
          alert('Successfully saved the document.');
          await router.push(`/main/wiki/${id}`);
        } else {
          setPending(false);
          /** Validated errors */
          if (action.payload.status === 400) {
            /** Price should be a string */
            const errorData = action.payload.data.validationErrors[0];
            if (errorData)
              keyInfoValidationErrorHandler(errorData.msg, errorData.param);
          } else {
            alert(
              `Error while creating new article. ERR: ${action.payload.status}`
            );
          }
        }
      });
    },
    [selectedOption, blocks, document, title, router]
  );

  return (
    <form onSubmit={onSave}>
      {(isAdmin || isTester) && (
        <>
          <WikiEdit
            types={selectedOption}
            onChangeTypes={onChangeTypes}
            title={title}
            setTitle={setTitle}
            blocks={blocks}
            setBlocks={setBlocks}
            keyInfo={document.keyInfo}
          />
          <Summary
            summary={summary}
            pending={pending}
            onChange={onSummaryChange}
          />
        </>
      )}
    </form>
  );
}

// This gets called on every request
export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const document = await getArticleReadData(params?.id as string);

  // Pass data to the page via props
  return { props: { document } };
}
