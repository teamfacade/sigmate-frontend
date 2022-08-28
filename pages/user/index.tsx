import dynamic from 'next/dynamic';
import { ClientRoute } from 'hooks/useSPARouting';

const Account = dynamic(() => import('containers/user/account'));
const Logs = dynamic(() => import('containers/user/points'));
const MyEdits = dynamic(() => import('containers/user/edits'));
const Referrals = dynamic(() => import('containers/user/referrals'));
const Calendar = dynamic(() => import('containers/user/calendar'));
const Staking = dynamic(() => import('containers/user/staking'));

export default function UserPage() {
  return (
    <>
      <ClientRoute path="/user" component={<Account />} />
      <ClientRoute path="/user/points" component={<Logs />} />
      <ClientRoute path="/user/edits" component={<MyEdits />} />
      <ClientRoute path="/user/referrals" component={<Referrals />} />
      <ClientRoute path="/user/calendar" component={<Calendar />} />
      <ClientRoute path="/user/staking" component={<Staking />} />
    </>
  );
}
