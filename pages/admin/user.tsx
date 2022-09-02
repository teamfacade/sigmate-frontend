import { MouseEventHandler, useCallback, useState } from 'react';
import styled from 'styled-components';
import {
  BasicWrapper,
  SectionWrapper,
  Search,
  LogTable,
  PageMoveBtns,
} from 'components/global';
import { LogHead, LogItem } from 'components/admin/user';

const levels = Array.from({ length: 31 }, (_, i) => i + 1);

const ExUser: Admin.UserType = {
  id: '1',
  name: 'limeAhn',
  level: '30',
  status: 'TBA',
  walletID: '0x09238579285783',
  signupDate: new Date(Date.now()).toISOString(),
};

const ExUsers = [
  ExUser,
  { ...ExUser, id: '2' },
  { ...ExUser, id: '3' },
  { ...ExUser, id: '4' },
  { ...ExUser, id: '5' },
  { ...ExUser, id: '6' },
  { ...ExUser, id: '7' },
  { ...ExUser, id: '8' },
  { ...ExUser, id: '9' },
  { ...ExUser, id: '0' },
];
const total = 4242;

export default function UserManagement() {
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
        <SectionWrapper header="User level">
          <div>
            <span>User level</span>
            <select name="level">
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <Search />
        </SectionWrapper>
      </BasicWrapper>
      <BasicWrapper>
        <SectionWrapper header="User list">
          <LogTable gap="3vw">
            <LogHead />
            {ExUsers.map((user) => (
              <LogItem
                key={user.id}
                name={user.name}
                level={user.level}
                status={user.status}
                walletID={user.walletID}
                signupDate={user.signupDate}
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
