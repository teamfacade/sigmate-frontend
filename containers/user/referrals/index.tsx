import {
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
  memo,
} from 'react';
import { store } from 'store/store';
import ReferralLogs from 'containers/user/referrals/ReferralLogs';
import {
  BasicWrapper,
  SectionWrapper,
  PageMoveBtns,
  Search,
} from 'components/global';
import { MyReferral } from 'components/user/referrals';
import styled from 'styled-components';

export type RefLogType = {
  timestamp: number;
  username: string;
  amount: string;
};

// @todo total값 역시 데이터로 받아온 것을 쓰기
const total = 482;

export default function Referrals() {
  const [refLogs, setRefLogs] = useState<RefLogType[]>([]);
  const [curPage, setCurPage] = useState(1);

  useEffect(
    () =>
      // @todo 초기 데이터 긁어오기
      setRefLogs([
        {
          timestamp: 1658389880695,
          username: 'Limeahn',
          amount: '10',
        },
        {
          timestamp: 1658389880696,
          username: 'Sigmate',
          amount: '10',
        },
        {
          timestamp: 1658389880697,
          username: 'jmyung',
          amount: '100',
        },
        {
          timestamp: 1658389880698,
          username: 'wk seo',
          amount: '10',
        },
      ]),
    []
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();
    // eslint-disable-next-line no-alert
    alert('Search!');
  }, []);

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
    <BasicWrapper>
      <SectionWrapper header="Referral" marginBottom="20px">
        <MyReferral
          refCode={
            (store.getState() as ReduxState.RootStateType).account.referralCode
          }
        />
        <ReferralLogs refLogs={refLogs} />
        <UtilWrapper>
          <Search white placeholder="Search a user..." onSubmit={onSubmit} />
        </UtilWrapper>
        <PageMoveBtns
          curPage={curPage}
          totalPage={Math.floor(total / 10) + 1}
          onClickPageMoveBtn={onClickPageMoveBtn}
          onClickPageNumBtn={onClickPageNumBtn}
        />
      </SectionWrapper>
    </BasicWrapper>
  );
}

const UtilWrapper = memo(styled.div`
  width: 180px;
  position: absolute;
  top: -5px;
  right: 0;
`);
