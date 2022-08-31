import { MouseEventHandler, useCallback, useState } from 'react';
import styled from 'styled-components';
import {
  BasicWrapper,
  SectionWrapper,
  Search,
  LogTable,
  PageMoveBtns,
} from 'components/global';
import { LogHead, LogItem } from 'components/admin/mintSchedule';
import { BlueBtnStyle } from 'styles/styleLib';

const tiers = Array.from({ length: 5 }, (_, i) => i + 1);

const EXSchedule: Admin.MintScheduleType = {
  id: 1,
  name: 'Bellygom Whitelist',
  tier: 2,
  date: new Date(Date.now()).toISOString(),
};
const ExSchedules = [
  EXSchedule,
  { ...EXSchedule, id: '2' },
  { ...EXSchedule, id: '3' },
  { ...EXSchedule, id: '4' },
  { ...EXSchedule, id: '5' },
  { ...EXSchedule, id: '6' },
  { ...EXSchedule, id: '7' },
  { ...EXSchedule, id: '8' },
  { ...EXSchedule, id: '9' },
  { ...EXSchedule, id: '0' },
];
const total = 4242;

export default function MintingSchedule() {
  const [curPage, setCurPage] = useState(1);

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
    <Wrapper>
      <BasicWrapper>
        <SectionWrapper header="Minting schedule">
          <div>
            <input type="date" />
            <span>Tier</span>
            <select name="tier">
              {tiers.map((tier) => (
                <option key={tier} value={tier}>
                  {tier}
                </option>
              ))}
            </select>
          </div>
          <Search />
          <CreateNewBtn>Add new</CreateNewBtn>
        </SectionWrapper>
      </BasicWrapper>
      <BasicWrapper>
        <SectionWrapper header="Search result">
          <LogTable gap="8vw">
            <LogHead />
            {ExSchedules.map((schedule) => (
              <LogItem
                key={schedule.id}
                name={schedule.name}
                date={schedule.date}
                tier={schedule.tier}
              />
            ))}
          </LogTable>
          <PageMoveBtns
            onClickPageNumBtn={onClickPageNumBtn}
            onClickPageMoveBtn={onClickPageMoveBtn}
            totalPage={total}
            curPage={curPage}
          />
        </SectionWrapper>
      </BasicWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  div + div {
    margin-top: 20px;
  }
`;

const CreateNewBtn = styled.button`
  ${BlueBtnStyle};
  position: absolute;
  top: -10px;
  right: 0;
`;
