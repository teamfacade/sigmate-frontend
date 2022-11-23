import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from 'hooks/reduxStoreHooks';

export default function AdminMain() {
  const router = useRouter();
  const { isAdmin } = useAppSelector(({ account }) => account);

  useEffect(() => {
    if (!isAdmin) {
      router.back();
    }
  }, []);

  if (isAdmin) return <div>Admin page</div>;
  return <div>: P</div>;
}
