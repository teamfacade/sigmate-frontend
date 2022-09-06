import { MouseEventHandler, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { getAuthorName } from 'lib/main/forum/getForumDatas';
import { Search, PageMoveBtns } from 'components/global';
import { ArticleThumbnail } from 'containers/main/forum/articleList';
import { PostBtn } from 'components/main/forum/articleList';
import useSWR, { Fetcher } from 'swr';
import Axios from 'lib/global/axiosInstance';

const total = 42;
const limit = 10;

const fetcher: Fetcher<Forum.PostType[], string> = (url: string) =>
  Axios.get(url).then((res) => res.data.forumPosts);

export default function ArticleLists() {
  const [curPage, setCurPage] = useState(1);
  const router = useRouter();

  const { data: articles } = useSWR(
    `/forum/c/${router.query.category}/p?limit=${limit}&page=${curPage}`,
    fetcher
  );

  const onClickPageNumBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setCurPage(parseInt(e.currentTarget.value, 10));
    },
    []
  );

  const onClickPageMoveBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      switch (e.currentTarget.name) {
        case 'ToFirst':
          setCurPage(1);
          break;
        case 'Prev':
          setCurPage((cur) => cur - 1);
          break;
        case 'Next':
          setCurPage((cur) => cur + 1);
          break;
        case 'ToLast':
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
      {articles?.map((article) => (
        <ArticleThumbnail
          key={article.id}
          id={article.id}
          category={article.categories[0].name}
          votes={article.votes || { voteCount: article.voteCount }}
          author={getAuthorName(article.createdBy)}
          tags={article.tags || []}
          timestamp={article.createdAt as string}
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

const UtilWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
