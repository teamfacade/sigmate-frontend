const ScheduleEx: Minting.ScheduleType = {
  id: 1,
  name: 'Bellygom',
  category: 'Category',
  tier: 1,
  mintingTime: new Date(Date.now()).toISOString(),
  mintingUrl: 'https://bellygom.launchpad.xclusive.market/',
  description: 'EXAMPLEEXAMPLEEXAMPLE',
  mintingPrice: '10.01',
  mintingPriceSymbol: 'ETH',
  collectionInfo: {
    twitterUrl: 'https://twitter.com/bellygom',
    telegramUrl: 'https://naver.com',
    discordUrl: 'https://discord.gg/t5aTrdCS',
    imageUrl: '',
  },
};

const SchedulesEx: Minting.ScheduleType[] = [
  ScheduleEx,
  { ...ScheduleEx, id: 2 },
  { ...ScheduleEx, id: 3 },
  { ...ScheduleEx, id: 4 },
  { ...ScheduleEx, id: 5 },
  { ...ScheduleEx, id: 6 },
  { ...ScheduleEx, id: 7 },
  { ...ScheduleEx, id: 8 },
];

export function getUpcomingSchedules() {
  // @todo Fetch upcoming schedules
  const upcomings: Minting.ScheduleType[] = SchedulesEx;

  return upcomings;
}
