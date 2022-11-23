import { MouseEventHandler, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { AxiosError } from 'axios';
import { getAuthorName } from 'lib/main/forum/getForumDatas';
import { initialSWRData, PageMoveBtns, BasicWrapper } from 'components/global';
import { ArticleThumbnail } from 'containers/main/forum/articleList';
import { PostBtn } from 'components/main/forum/articleList';
import useSWR, { Fetcher } from 'swr';
import Axios from 'lib/global/axiosInstance';
import { useAppSelector } from 'hooks/reduxStoreHooks';

const limit = 10;

const fetcher: Fetcher<PagedSWRDataType<Forum.PostType[]>, string> = async (
  url: string
) => {
  try {
    const { data, status } = await Axios.get(url);
    if (status === 200)
      return {
        total: data.forumPosts.length,
        data: data.forumPosts,
      };
    return initialSWRData;
  } catch (e) {
    alert(
      `Error while fetching forum posts. ERR ${
        (e as AxiosError).response?.status
      }`
    );
    return initialSWRData;
  }
};

export default function ArticleLists() {
  const router = useRouter();
  const [curPage, setCurPage] = useState(1);
  const { userName, isAdmin } = useAppSelector(({ account }) => account);

  const { data: articles = initialSWRData } = useSWR(
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
      await router.push(
        `/main/forum/${router.query.category}/new-post${
          router.query.notice === 'true' ? '?notice=true' : ''
        }`
      );
    }, [userName]);

  return (
    <>
      <UtilWrapper>
        {/* <Search white placeholder="Search..." /> */}
        {(router.query.category !== '24' || isAdmin) && (
          <PostBtn onClickNew={onClickNew} />
        )}
      </UtilWrapper>
      {articles.total > 0 ? (
        articles.data.map((article) => (
          <ArticleThumbnail
            key={article.id}
            id={article.id}
            category={router.query.category as string}
            votes={{ voteCount: article.voteCount || 0 }}
            author={getAuthorName(article.createdBy)}
            username={article.createdBy?.userName || 'Deleted user'}
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
      {articles.total > 0 && (
        <PageMoveBtns
          totalPage={articles.total}
          curPage={curPage}
          setCurPage={setCurPage}
        />
      )}
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
