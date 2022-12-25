import { useEffect, useState } from 'react';
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
import { MyReferral, RefTotal, ReferralEmpty } from 'components/user/referrals';

export type RefLogType = {
  id: number;
  userName: string;
  createdAt: string;
  primaryProfile: {
    displayName: string;
  };
};

export default function Referrals() {
  const dispatch = useAppDispatch();
  const [refTotal, setRefTotal] = useState<number>(0);
  const [refLogs, setRefLogs] = useState<RefLogType[]>([]);
  const [curPage, setCurPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  useEffect(() => {
    /** Wait for the auth state restoring */
    setTimeout(
      () =>
        dispatch(
          AuthRequiredAxios({
            method: 'GET',
            url: `/user/referrals?page=${curPage}&limit=10`,
          })
        ).then((action: any) => {
          const { status, data } = action.payload;
          if (status && status === 200) {
            setTotalPage(data.page.total);
            setRefTotal(data.count);
            setRefLogs(data.data);
          } else {
            alert(`Error while fetching referral logs: ERR ${status}`);
          }
        }),
      500
    );
  }, [curPage]);

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
        {refTotal === 0 ? (
          <ReferralEmpty />
        ) : (
          <ReferralLogs refLogs={refLogs} />
        )}
        {totalPage > 0 && (
          <PageMoveBtns
            curPage={curPage}
            totalPage={totalPage}
            setCurPage={setCurPage}
          />
        )}
      </SectionWrapper>
    </BasicWrapper>
  );
}
