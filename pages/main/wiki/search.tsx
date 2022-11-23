import { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR, { Fetcher } from 'swr';
import styled from 'styled-components';
import Axios from 'lib/global/axiosInstance';
import { PageMoveBtns } from 'components/global';
import { NoArticleYet } from 'components/main/wiki/read';
import { SearchResult } from 'components/main/wiki/search';
import styles from 'styles/styleLib';
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
    <div>
      <H1>{`Search for: ${router.query.title}`}</H1>
      <Wrapper>
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
      </Wrapper>
      <NoArticleYet title="" />
    </div>
  );
}

const Wrapper = styled.div`
  padding-bottom: 32px;
  margin-bottom: 16px;
  border-bottom: 1px solid ${styles.colors.hrColor};
`;

const H1 = styled.h1`
  margin: 0 0 18px 0;
  color: ${styles.colors.logoColor};
  font-size: 40px;
  font-weight: bold;
  line-height: 110%;
  text-align: left;
  padding-bottom: 32px;
`;
