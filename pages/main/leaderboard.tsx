import { useCallback, useEffect, useState } from 'react';
import useSWR, { Fetcher } from 'swr';
import { AxiosError } from 'axios';
import Axios from 'lib/global/axiosInstance';
import { useAppDispatch, useAppSelector } from 'hooks/reduxStoreHooks';
import { AuthRequiredAxios } from 'store/modules/authSlice';
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
  const dispatch = useAppDispatch();
  const { userName } = useAppSelector(({ account }) => account);
  const [curPage, setCurPage] = useState(1);
  const [myData, setMyData] = useState<Leaderboad.ItemType | null>(null);
  const [items, setItems] = useState<Leaderboad.ItemType[]>([]);

  const { data: leaderboardItems } = useSWR(
    `/leaderboard?page=${curPage}&limit=20`,
    leaderboardFetcher
  );

  useEffect(() => {
    if (userName) {
      dispatch(
        AuthRequiredAxios({ method: 'GET', url: '/leaderboard/my' })
      ).then((action: any) => {
        const { status, data } = action.payload;
        if (status === 200) {
          setMyData(data.leaderboard);
        } else alert(`Error while fetching my data: ERR ${status}`);
      });
    }
  }, [userName]);

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
      }, 800);
    }
  }, [leaderboardItems, debouncing]);

  /** SWR로 받아온 데이터 concat */
  useEffect(() => {
    if (leaderboardItems && leaderboardItems.length > 0) {
      setItems((current) => {
        return current.concat(
          leaderboardItems.filter(
            (item) =>
              current.find((cur) => cur.user.id === item.user.id) === undefined
          )
        );
      });
    }
  }, [leaderboardItems]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      clearTimeout(timeoutID);
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SectionWrapper header="Leaderboard" marginBottom="20px">
      <Board myData={myData} leaderboardItems={items} />
    </SectionWrapper>
  );
}
