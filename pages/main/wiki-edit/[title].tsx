import {
  useState,
  useCallback,
  ChangeEventHandler,
  MouseEventHandler,
} from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getArticleEditData, BlockType } from 'lib/main/wiki/getWikiData';
import { WikiEdit } from 'containers/main/wiki/edit';
import { Summary } from 'components/main/wiki/edit';

export default function WikiEditPage({
  article,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [blocks, setBlocks] = useState<BlockType[]>(article.blocks);
  const [summary, setSummary] = useState('');

  const onSummaryChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => setSummary(e.target.value),
    []
  );

  const onSave: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    // eslint-disable-next-line no-alert
    alert('Save edits');
  }, []);

  return (
    <>
      <WikiEdit title={article.title} blocks={blocks} setBlocks={setBlocks} />
      <Summary summary={summary} onChange={onSummaryChange} onClick={onSave} />
    </>
  );
}

// This gets called on every request
export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  // Fetch data from external API
  const article = getArticleEditData(params?.title as string);

  // Pass data to the page via props
  return { props: { article } };
}
