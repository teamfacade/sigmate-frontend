import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getArticleReadNewData } from 'lib/main/wiki/getWikiData';
import { WikiArticleNewData } from 'containers/main/wiki/read';
import { LargeText } from 'components/global';

export default function NewEditorTest({
  document,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (document) return <WikiArticleNewData document={document} />;
  return <LargeText>There's no such document your looking for</LargeText>;
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  // @todo Fetch necessary data for the wiki article using params.title
  const document = await getArticleReadNewData();
  return {
    props: {
      document,
    },
  };
}
