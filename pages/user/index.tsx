import { ClientRoute } from 'hooks/useSPARouting';
/* @todo: lazy import가 가능하지 않을까? */
import Account from 'containers/user/account';
import Tokens from 'containers/user/tokens';
import Points from 'containers/user/points';

export default function UserPage() {
  return (
    <>
      <ClientRoute path="/user" component={<Account />} />
      <ClientRoute path="/user/tokens" component={<Tokens />} />
      <ClientRoute path="/user/points" component={<Points />} />
    </>
  );
}
