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
    const [selectedOption, setSelectedOption] = useState<
      ReactSelect.OptionType[]
    >(
      document.types?.map((type) => ({
        value: type,
        label: type,
      })) || []
    );
    const [blocks, setBlocks] = useState<Wiki.DocumentBlockType[]>(() => {
      const initBlocks: Wiki.DocumentBlockType[] = [];
      if (document.blocks) {
        const flattenBlocks = Object.values(document.blocks);
        document.structure.forEach((blockID) => {
          const curBlock = flattenBlocks.find((block) => block.id === blockID);
          if (curBlock) initBlocks.push(curBlock);
        });
      }
      return initBlocks;
    });
    const [summary, setSummary] = useState('');

    const onChangeTypes: ReactSelect.MultiSelectChangeEventHandler =
      useCallback((selected) => {
        if (selected) {
          setSelectedOption(selected.concat());
        }
      }, []);

    const onSummaryChange: ChangeEventHandler<HTMLTextAreaElement> =
      useCallback((e) => setSummary(e.target.value), []);

    const onSave: FormEventHandler<HTMLFormElement> = useCallback(
      (e) => {
        const collection: any = {};
        e.preventDefault();
        const { id, title } = document;
        const { elements } = e.currentTarget;

        if (document.keyInfo) {
          const team = elements.namedItem('Team') as HTMLTextAreaElement;
          const history = elements.namedItem('History') as HTMLTextAreaElement;
          const category = elements.namedItem('Category') as HTMLSelectElement;
          const utility = elements.namedItem('Utility') as HTMLTextAreaElement;

          if (team.value === '') {
            alert('NFT Collection document must have team information.');
            team.focus();
            return;
          }
          collection.team = team.value;
          collection.history = history.value;
          collection.category = category.value;
          collection.utility = utility.value;
        }

        if (blocks.length === 0) {
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
          } else
            alert(
              `Error while creating new article. ERR: ${action.payload.status}`
            );
        });
      },
      [selectedOption, blocks, document, router]
    );

    return (
      <>
        <WikiEdit
          types={selectedOption}
          onChangeTypes={onChangeTypes}
          title={document.title}
          blocks={blocks}
          setBlocks={setBlocks}
          keyInfo={document.keyInfo}
        />
        <Summary
          summary={summary}
          onChange={onSummaryChange}
          onSubmit={onSave}
        />
      </>
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
