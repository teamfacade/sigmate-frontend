import { MouseEventHandler, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Utils, Schedules } from 'containers/main/upcoming';
import { PageMoveBtns } from 'components/global';

const ScheduleEx = {
  id: 1,
  event: 'Whitelist Minting',
  collection: 'Bellygom',
  price: '10.01',
  symbol: 'ETH',
  tier: 1,
  wikiPageUrl: '/main/wiki/Bellygom',
  twitterUrl: 'https://twitter.com/bellygom',
  telegramUrl: '',
  discordUrl: 'https://discord.gg/t5aTrdCS',
  mintPageUrl: 'https://bellygom.launchpad.xclusive.market/',
  imageUrl: '',
};

const SchedulesEx = [
  ScheduleEx,
  { ...ScheduleEx, id: 2 },
  { ...ScheduleEx, id: 3 },
  { ...ScheduleEx, id: 4 },
  { ...ScheduleEx, id: 5 },
  { ...ScheduleEx, id: 6 },
  { ...ScheduleEx, id: 7 },
  { ...ScheduleEx, id: 8 },
];
const total = 13;

export default function Upcoming() {
  const [curPage, setCurPage] = useState(1);

  const onClickPageNumBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setCurPage(parseInt(e.currentTarget.value, 10));
      // eslint-disable-next-line no-alert
      alert(
        `Fetch 15 categories from ${
          (parseInt(e.currentTarget.value, 10) - 1) * 15
        }`
      );
    },
    []
  );

  const onClickPageMoveBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      switch (e.currentTarget.name) {
        case 'ToFirst':
          // eslint-disable-next-line no-alert
          alert(`Fetch 15 categories from 0th`);
          setCurPage(1);
          break;
        case 'Prev':
          // eslint-disable-next-line no-alert
          alert(`Fetch 15 categories from ${(curPage - 1 - 1) * 15}th `);
          setCurPage((cur) => cur - 1);
          break;
        case 'Next':
          // eslint-disable-next-line
          alert(`Fetch 15 categories from ${curPage * 15}th`);
          setCurPage((cur) => cur + 1);
          break;
        case 'ToLast':
          // eslint-disable-next-line
          alert(`Fetch 15 categories from ((total / 15) * 10)th`);
          setCurPage(
            Math.floor(Number.parseInt((total / 15).toFixed(), 10)) + 1
          );
          break;
        default:
          break;
      }
    },
    [curPage]
  );
  return (
    <Wrapper>
      <Utils />
      <Schedules schedules={SchedulesEx} />
      <PageMoveBtns
        totalPage={total}
        curPage={curPage}
        onClickPageMoveBtn={onClickPageMoveBtn}
        onClickPageNumBtn={onClickPageNumBtn}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 1060px;
`;
