import { MouseEventHandler, useCallback, useState } from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import {
  getAllCategories,
  getCategoryArticles,
  getAuthorName,
} from 'lib/main/forum/getForumDatas';
import { Search, PageMoveBtns } from 'components/global';
import { ArticleThumbnail } from 'containers/main/forum/articleList';
import { PostBtn } from 'components/main/forum/articleList';

const total = 42;

export default function ArticleLists({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [curPage, setCurPage] = useState(1);
  const router = useRouter();

  const onClickPageNumBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setCurPage(parseInt(e.currentTarget.value, 10));
      // eslint-disable-next-line no-alert
      alert(
        `Fetch 4 articles from ${
          (parseInt(e.currentTarget.value, 10) - 1) * 4
        }th`
      );
    },
    []
  );

  const onClickPageMoveBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      switch (e.currentTarget.name) {
        case 'ToFirst':
          // eslint-disable-next-line no-alert
          alert(`Fetch 4 articles from 0th`);
          setCurPage(1);
          break;
        case 'Prev':
          // eslint-disable-next-line no-alert
          alert(`Fetch 4 articles from ${(curPage - 1 - 1) * 4}th`);
          setCurPage((cur) => cur - 1);
          break;
        case 'Next':
          // eslint-disable-next-line
          alert(`Fetch 4 articles from ${curPage * 4}th`);
          setCurPage((cur) => cur + 1);
          break;
        case 'ToLast':
          // eslint-disable-next-line
          alert(`Fetch 4 articles from ((total / 4) * 4)th`);
          setCurPage(Math.floor(total / 4) + 1);
          break;
        default:
          break;
      }
    },
    [curPage]
  );

  return (
    <>
      <UtilWrapper>
        <Search white placeholder="Search..." />
        {router.query.category !== 'Best' && (
          <PostBtn category={router.query.category as string} />
        )}
      </UtilWrapper>
      {articles.map((article) => (
        <ArticleThumbnail
          key={article.id}
          id={article.id}
          category={router.query.category as string}
          votes={article.votes || { voteCount: 0 }}
          author={getAuthorName(article.createdBy)}
          tags={article.tags || []}
          timestamp={article.contentUpdatedAt as string}
          title={article.title}
          content={article.content}
          imageURL={(article.imageUrls && article.imageUrls[0]) || ''}
        />
      ))}
      <PageMoveBtns
        totalPage={total}
        curPage={curPage}
        onClickPageNumBtn={onClickPageNumBtn}
        onClickPageMoveBtn={onClickPageMoveBtn}
      />
    </>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for categories
  const paths = getAllCategories();

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const articles = getCategoryArticles(params?.category as string);
  return {
    props: {
      articles,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 minutes
    revalidate: 300, // In seconds
  };
}

const UtilWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
