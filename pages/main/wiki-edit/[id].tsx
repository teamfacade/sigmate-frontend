import {
  useState,
  useCallback,
  ChangeEventHandler,
  FormEventHandler,
} from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { getArticleReadData } from 'lib/main/wiki/getWikiData';
import { useAppDispatch } from 'hooks/reduxStoreHooks';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import { WikiEdit, Summary } from 'containers/main/wiki/edit';
import { LargeText } from 'components/global';

export default function WikiEditPage({
  document,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  if (!document) {
    router.push('/main/wiki/Sigmate');
    return (
      <LargeText>There's no such document you are trying to edit.</LargeText>
    );
  }
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
      const collection: any = {};
      e.preventDefault();
      const { id } = document;
      const { elements } = e.currentTarget;

      if (document.keyInfo) {
        const team = elements.namedItem('Team') as HTMLTextAreaElement;
        const history = elements.namedItem('History') as HTMLTextAreaElement;
        const category = elements.namedItem('Category') as HTMLSelectElement;
        const utility = elements.namedItem('Utility') as HTMLTextAreaElement;
        const mintingPriceWl = elements.namedItem(
          'Whitelist'
        ) as HTMLTextAreaElement;
        const mintingPricePublic = elements.namedItem(
          'Public'
        ) as HTMLTextAreaElement;

        if (team.value === '') {
          setPending(false);
          alert('NFT Collection document must have team information.');
          team.focus();
          return;
        }
        collection.team = team.value;
        collection.history = history.value;
        collection.category = category.value;
        collection.utility = utility.value;
        if (mintingPriceWl.value !== '')
          collection.mintingPriceWl = mintingPriceWl.value;
        if (mintingPricePublic.value !== '')
          collection.mintingPricePublic = mintingPricePublic.value;
      }
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
            if (errorData?.msg === 'NOT_FLOAT')
              alert(
                `Price must be a floating number.\r\nError at: ${errorData.value}`
              );
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
      <WikiEdit
        types={selectedOption}
        onChangeTypes={onChangeTypes}
        title={title}
        setTitle={setTitle}
        blocks={blocks}
        setBlocks={setBlocks}
        keyInfo={document.keyInfo}
      />
      <Summary summary={summary} pending={pending} onChange={onSummaryChange} />
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
