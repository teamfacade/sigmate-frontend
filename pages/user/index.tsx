import { ClientRoute } from 'hooks/useSPARouting';
import Account from 'containers/user/account';

export default function UserPage() {
  return <ClientRoute path="/user" component={<Account />} />;
}
