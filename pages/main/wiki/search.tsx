import { MouseEventHandler, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR, { Fetcher } from 'swr';
import styled from 'styled-components';
import Axios from 'lib/global/axiosInstance';
import { PageMoveBtns } from 'components/global';
import { NoArticleYet } from 'components/main/wiki/read';
import { SearchResult } from 'components/main/wiki/search';
import styles from 'styles/styleLib';
import { AxiosError } from 'axios';

let total = 0;
const limit = 50;

const fetcher: Fetcher<Wiki.SearchResultType[] | null, string> = async (
  url
) => {
  try {
    const res = await Axios.get(url);
    if (res.status === 200) {
      total = res.data.page.total;
      return res.data.data;
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
  const { data: searchResults } = useSWR(
    `/wiki/d?q=${router.query.title}&limit=${limit}&page=${curPage}`,
    fetcher
  );

  const onClickPageNumBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setCurPage(parseInt(e.currentTarget.value, 10));
      // eslint-disable-next-line no-alert
      alert(
        `Fetch 10 referral logs from ${
          (parseInt(e.currentTarget.value, 10) - 1) * 10
        }th log`
      );
    },
    []
  );

  const onClickPageMoveBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      switch (e.currentTarget.name) {
        case 'ToFirst':
          // eslint-disable-next-line no-alert
          alert(`Fetch 10 referral logs from 0th log`);
          setCurPage(1);
          break;
        case 'Prev':
          // eslint-disable-next-line no-alert
          alert(`Fetch 10 referral logs from ${(curPage - 1 - 1) * 10}th log`);
          setCurPage((cur) => cur - 1);
          break;
        case 'Next':
          // eslint-disable-next-line
          alert(`Fetch 10 referral logs from ${curPage * 10}th log`);
          setCurPage((cur) => cur + 1);
          break;
        case 'ToLast':
          // eslint-disable-next-line
          alert(`Fetch 10 referral logs from ((total / 10) * 10)th log`);
          setCurPage(Math.floor(total / 10) + 1);
          break;
        default:
          break;
      }
    },
    [curPage]
  );

  return (
    <div>
      <H1>{`Search for: ${router.query.title}`}</H1>
      <Wrapper>
        {searchResults?.map((result) => (
          <SearchResult
            key={result.id}
            id={result.id}
            title={result.title}
            textContent={result.textContent}
          />
        ))}
        {searchResults?.length !== 0 && (
          <PageMoveBtns
            curPage={curPage}
            totalPage={Math.floor(total / limit) + 1}
            onClickPageNumBtn={onClickPageNumBtn}
            onClickPageMoveBtn={onClickPageMoveBtn}
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
