import { useCallback, useEffect, useState } from 'react';
import useSWR, { Fetcher } from 'swr';
import { AxiosError } from 'axios';
import Axios from 'lib/global/axiosInstance';
import { SectionWrapper } from 'components/global';
import { Board } from 'containers/main/leaderboard';

let timeoutID: ReturnType<typeof setTimeout>;
let debouncing = false;

const leaderboardFetcher: Fetcher<Leaderboad.ItemType[], string> = async (
  url
) => {
  try {
    const { status, data } = await Axios.get(url);
    if (status === 200) {
      return data.data;
    }
    return [];
  } catch (e) {
    alert(
      `Error while fetching leaderboard data. ERR: ${
        (e as AxiosError).response?.status
      }`
    );
    return [];
  }
};

export default function Leaderboard() {
  const [curPage, setCurPage] = useState(1);
  const [items, setItems] = useState<Leaderboad.ItemType[]>([]);

  const { data: leaderboardItems = [] } = useSWR(
    `/leaderboard?page=${curPage}&limit=10`,
    leaderboardFetcher
  );

  const onScroll = useCallback(() => {
    const { scrollHeight, scrollTop } = document.documentElement;
    if (
      scrollHeight - scrollTop < 1500 &&
      (leaderboardItems === undefined || leaderboardItems.length > 0) &&
      !debouncing
    ) {
      debouncing = true;
      setCurPage((cur) => cur + 1);
      timeoutID = setTimeout(() => {
        debouncing = false;
      }, 500);
    }
  }, []);

  /** SWR로 받아온 데이터 concat */
  useEffect(() => {
    if (leaderboardItems && leaderboardItems.length > 0) {
      setItems((current) => {
        return current.concat(leaderboardItems);
      });
    }
  }, [leaderboardItems]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      clearTimeout(timeoutID);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <SectionWrapper header="Leaderboard" marginBottom="20px">
      <Board leaderboardItems={items} />
    </SectionWrapper>
  );
}
