import { ClientRoute } from 'hooks/useSPARouting';
import Account from 'containers/user/account';
import Tokens from 'containers/user/tokens';

export default function UserPage() {
  return (
    <>
      <ClientRoute path="/user" component={<Account />} />
      <ClientRoute path="/user/tokens" component={<Tokens />} />
      <ClientRoute path="/user/points" component={<Tokens />} />
    </>
  );
}
