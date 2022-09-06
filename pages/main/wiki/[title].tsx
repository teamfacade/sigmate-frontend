import { InferGetStaticPropsType, GetStaticPropsContext } from 'next';
import {
  getAllArticleTitles,
  getArticleReadData,
} from 'lib/main/wiki/getWikiData';
import { WikiArticle } from 'containers/main/wiki/read';
import { NoArticleYet } from 'components/main/wiki/read';

export default function WikiPage({
  title,
  document,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (document === null) return <NoArticleYet title={title} />;
  return <WikiArticle document={document} />;
}

export async function getStaticPaths() {
  // Return a list of possible value for title
  const paths = getAllArticleTitles();

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return {
    paths,
    fallback: 'blocking',
  };
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps({ params }: GetStaticPropsContext) {
  // @todo Fetch necessary data for the wiki article using params.title
  const { document } = getArticleReadData(params?.title as string);
  return {
    props: {
      title: params?.title as string,
      document,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 minutes
    revalidate: 300, // In seconds
  };
}
