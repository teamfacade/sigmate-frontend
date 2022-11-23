import { useAppSelector } from 'hooks/reduxStoreHooks';

export default function AdminMain() {
  const { isAdmin } = useAppSelector(({ account }) => account);

  if (isAdmin) return <div>Admin page</div>;
  return <div>: P</div>;
}
