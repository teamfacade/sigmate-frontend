import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ClientRoute } from 'hooks/useSPARouting';
import { store } from 'store/store';
// import Staking from 'containers/user/staking';

const Account = dynamic(() => import('containers/user/account'));
const Logs = dynamic(() => import('containers/user/points'));
// const MyEdits = dynamic(() => import('containers/user/edits'));
const Referrals = dynamic(() => import('containers/user/referrals'));
const Calendar = dynamic(() => import('containers/user/calendar'));

export default function UserPage() {
  useEffect(() => {
    if (!(store.getState() as ReduxState.RootStateType).account.agreeTos) {
      window.location.assign('/auth');
    }
  }, []);

  return (
    <>
      <ClientRoute path="/user" component={<Account />} />
      <ClientRoute path="/user/points" component={<Logs />} />
      {/* <ClientRoute path="/user/edits" component={<MyEdits />} /> */}
      <ClientRoute path="/user/referrals" component={<Referrals />} />
      <ClientRoute path="/user/calendar" component={<Calendar />} />
      {/* <ClientRoute path="/user/staking" component={<Staking />} /> */}
    </>
  );
}
