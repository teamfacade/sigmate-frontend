import { ClientRoute } from 'hooks/useSPARouting';
/* @todo: lazy import가 가능하지 않을까? */
import Account from 'containers/user/account';
import Tokens from 'containers/user/tokens';
import Logs from 'containers/user/points';
import Calendar from 'containers/user/calendar';
import Staking from 'containers/user/staking';

export default function UserPage() {
  return (
    <>
      <ClientRoute path="/user" component={<Account />} />
      <ClientRoute path="/user/tokens" component={<Tokens />} />
      <ClientRoute path="/user/points" component={<Logs />} />
      <ClientRoute path="/user/calendar" component={<Calendar />} />
      <ClientRoute path="/user/staking" component={<Staking />} />
    </>
  );
}
