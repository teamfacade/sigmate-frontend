import { MouseEventHandler, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { getAuthorName } from 'lib/main/forum/getForumDatas';
import { Search, PageMoveBtns, BasicWrapper } from 'components/global';
import { ArticleThumbnail } from 'containers/main/forum/articleList';
import { PostBtn } from 'components/main/forum/articleList';
import useSWR, { Fetcher } from 'swr';
import Axios from 'lib/global/axiosInstance';
import { useAppSelector } from 'hooks/reduxStoreHooks';

let total = 42;
const limit = 10;

const fetcher: Fetcher<Forum.PostType[], string> = (url: string) =>
  Axios.get(url).then((res) => {
    total = res.data.forumPosts.length;
    return res.data.forumPosts;
  });

export default function ArticleLists() {
  const router = useRouter();
  const [curPage, setCurPage] = useState(1);
  const { userName } = useAppSelector(({ account }) => account);

  const { data: articles } = useSWR(
    router.query.category
      ? `/forum/c/${router.query.category}/p?limit=${limit}&page=${curPage}`
      : null,
    router.query.category ? fetcher : null
  );
  const onClickNew: MouseEventHandler<HTMLButtonElement> =
    useCallback(async () => {
      if (!userName) {
        await router.push('/auth');
        return;
      }
      await router.push(`/main/forum/${router.query.category}/new-post`);
    }, [userName]);

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
          setCurPage(Math.floor(total / limit) + 1);
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
        {/* <Search white placeholder="Search..." /> */}
        {router.query.category !== 'Best' && (
          <PostBtn onClickNew={onClickNew} />
        )}
      </UtilWrapper>
      {articles ? (
        articles.map((article) => (
          <ArticleThumbnail
            key={article.id}
            id={article.id}
            category={router.query.category as string}
            votes={{ voteCount: article.voteCount || 0 }}
            author={getAuthorName(article.createdBy)}
            username={article.createdBy.userName as string}
            tags={article.tags?.map((tag) => tag.name) || []}
            timestamp={article.createdAt as string}
            title={article.title}
            content={article.content}
            imageURL={(article.imageUrls && article.imageUrls[0]) || ''}
          />
        ))
      ) : (
        <BasicWrapper>
          <LargeText>There's no article : (</LargeText>
        </BasicWrapper>
      )}
      <PageMoveBtns
        totalPage={Math.floor(total / limit) + 1}
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
  justify-content: flex-end;
  margin-bottom: 40px;
`;

const LargeText = styled.p`
  margin: auto;
  text-align: center;
  color: #96b8d7;
  font-family: 'Claris Sans', sans-serif;
  font-size: 50px;
  font-weight: 200;
  line-height: 150%;
`;
