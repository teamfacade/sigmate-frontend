import { ClientRoute } from 'hooks/useSPARouting';
import Account from 'containers/user/account';
import Points from 'containers/user/points';

export default function UserPage() {
  return (
    <>
      <ClientRoute path="/user" component={<Account />} />
      <ClientRoute path="/user/points" component={<Points />} />
    </>
  );
}
