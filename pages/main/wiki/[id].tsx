import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getArticleReadData } from 'lib/main/wiki/getWikiData';
import { WikiArticle } from 'containers/main/wiki/read';
import { LargeText } from 'components/global';

export default function WikiPage({
  document,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (document) return <WikiArticle document={document} />;
  return <LargeText>There's no such document your looking for</LargeText>;
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  // @todo Fetch necessary data for the wiki article using params.title
  const document = await getArticleReadData(params?.id as string);
  return {
    props: {
      document,
    },
  };
}
