import { useRouter } from 'next/router';
import { useAppDispatch } from 'hooks/reduxStoreHooks';
import { signOut } from 'store/modules/authSlice';
import Syncs from './Syncs';
import Infos from './Infos';
import WikiSettings from './WikiSettings';

export default function Account() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div>
      <Syncs />
      <Infos />
      <WikiSettings />
      <button
        type="button"
        onClick={() => {
          dispatch(signOut());
          router.push('/main');
        }}
      >
        Sign out
      </button>
    </div>
  );
}
