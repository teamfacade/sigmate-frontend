import { InferGetStaticPropsType, GetStaticPropsContext } from 'next';
import {
  getAllArticleTitles,
  getArticleReadData,
} from 'lib/main/wiki/getWikiData';
import { WikiArticle } from 'containers/main/wiki/read';
import styled from 'styled-components';

export default function WikiPage({
  document,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (document) return <WikiArticle document={document} />;
  return <LargeText>There's no such document your looking for</LargeText>;
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
  const document = await getArticleReadData(params?.id as string);
  return {
    props: {
      document,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 minutes
    revalidate: 300, // In seconds
  };
}

const LargeText = styled.p`
  margin: auto;
  text-align: center;
  color: #96b8d7;
  font-family: 'Claris Sans', sans-serif;
  font-size: 50px;
  font-weight: 200;
  line-height: 150%;
`;
