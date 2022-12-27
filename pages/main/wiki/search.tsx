import { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR, { Fetcher } from 'swr';
import styled from 'styled-components';
import Axios from 'lib/global/axiosInstance';
import { PageMoveBtns, BasicWrapper } from 'components/global';
import { NoArticleYet } from 'components/main/wiki/read';
import { SearchResult , SearchTitle } from 'components/main/wiki/search';
import { AxiosError } from 'axios';

const limit = 50;

const fetcher: Fetcher<
  PagedSWRDataType<Wiki.SearchResultType[]> | null,
  string
> = async (url) => {
  try {
    const res = await Axios.get(url);
    if (res.status === 200) {
      return { data: res.data.data, total: res.data.page.total };
    }
    alert(`Error while searching the article. ERR: ${res.status}`);
    return null;
  } catch (e: any) {
    alert(
      `Error while searching the article. ERR: ${(e as AxiosError).status}`
    );
    return null;
  }
};

export default function SearchResultPage() {
  const router = useRouter();
  const [curPage, setCurPage] = useState<number>(1);
  const { data: searchResults = null } = useSWR(
    `/wiki/d?q=${router.query.title}&limit=${limit}&page=${curPage}`,
    fetcher
  );

  return (
    <>
      <UtilWrapper>
        <NoArticleYet title="" />
      </UtilWrapper>
      <BasicWrapper>
        <SearchTitle searched={router.query.title as string} />
        {searchResults?.data?.map((result) => (
          <SearchResult
            key={result.id}
            id={result.id}
            title={result.title}
            textContent={result.textContent}
          />
        ))}
        {searchResults && searchResults.total > 0 && (
          <PageMoveBtns
            curPage={curPage}
            totalPage={searchResults.total}
            setCurPage={setCurPage}
          />
        )}
      </BasicWrapper>
    </>
  );
}

const UtilWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;
