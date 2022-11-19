import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { store } from 'store/store';
import { useAppDispatch } from 'hooks/reduxStoreHooks';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import ReferralLogs from 'containers/user/referrals/ReferralLogs';
import {
  BasicWrapper,
  SectionWrapper,
  PageMoveBtns,
  LargeText,
} from 'components/global';
import { MyReferral, RefTotal } from 'components/user/referrals';

export type RefLogType = {
  id: number;
  userName: string;
  createdAt: string;
  primaryProfile: {
    displayName: string;
  };
};

let total = 1;

export default function Referrals() {
  const dispatch = useAppDispatch();
  const [refTotal, setRefTotal] = useState<number>(0);
  const [refLogs, setRefLogs] = useState<RefLogType[]>([]);
  const [curPage, setCurPage] = useState(1);

  useEffect(() => {
    /** Wait for the auth state restoring */
    setTimeout(
      () =>
        dispatch(
          AuthRequiredAxios({
            method: 'GET',
            url: `/user/referrals?page=${curPage}`,
          })
        ).then((action: any) => {
          const { status, data } = action.payload;
          if (status && status === 200) {
            total = data.page.total;
            setRefTotal(data.count);
            setRefLogs(data.data);
          } else {
            alert(`Error while fetching referral logs: ERR ${status}`);
          }
        }),
      500
    );
  }, [curPage]);

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
        {/** @todo Referral total 가져오기 */}
        <RefTotal total={refTotal} />
        <MyReferral
          refCode={
            (store.getState() as ReduxState.RootStateType).account.referralCode
          }
        />
        <ReferralLogs refLogs={refLogs} />
        {refTotal === 0 && <LargeText>No one ;(</LargeText>}
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
