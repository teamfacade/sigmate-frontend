import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function getMintingSchedules() {
  /*
    const { data, error } = useSWR('/calendar', fetcher);
    return (data);
    */

  const ExSchedule: Minting.ScheduleType = {
    id: 1,
    name: 'Bored Ape Yacht Club',
    category: 'PFP',
    tier: 1,
    mintingTime: new Date(Date.now()).toISOString(),
    mintingUrl: 'https://bellygom.launchpad.xclusive.market/',
    description: '',
    collectionInfo: {
      imageUrl: '',
      twitterUrl: 'https://www.twitter.com/elonmusk',
      telegramUrl: 'https://www.naver.com',
      discordUrl: 'https://www.tradingview.com',
    },
    mintingPrice: '10.01',
    mintingPriceSymbol: 'ETH',
  };

  const ExSchedules: Minting.SchedulesType = {
    '09.25.2022': [
      ExSchedule,
      {
        ...ExSchedule,
        id: 2,
      },
      {
        ...ExSchedule,
        id: 3,
      },
      {
        ...ExSchedule,
        id: 4,
      },
      {
        ...ExSchedule,
        id: 5,
      },
    ],
    '09.15.2022': [
      ExSchedule,
      {
        ...ExSchedule,
        id: 2,
      },
      {
        ...ExSchedule,
        id: 3,
      },
      {
        ...ExSchedule,
        id: 4,
      },
    ],
    '09.30.2022': [
      ExSchedule,
      {
        ...ExSchedule,
        id: 2,
      },
      {
        ...ExSchedule,
        id: 3,
      },
      {
        ...ExSchedule,
        id: 4,
      },
      {
        ...ExSchedule,
        id: 5,
      },
    ],
  };
  return ExSchedules;
}
