import React, {
  PropsWithChildren,
  useState,
  useMemo,
  useContext,
  useEffect,
  ComponentProps,
  MouseEventHandler,
} from 'react';
import Link from 'next/link';

/*
    make SPA with nextjs :
    https://towardsdev.com/how-to-build-spa-with-nextjs-2ba6e6b6f564
*/

interface Context {
  route: string;
  setRoute: (route: string) => void;
}

type RouteProps = {
  path: string;
  component: JSX.Element;
};

interface LinkProps extends ComponentProps<'a'> {
  to: string;
}

type RouterProps = {
  whileLoading?: JSX.Element;
};

export const ClientRouterContext = React.createContext<Context>({
  route: '/',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setRoute: (route: string) => {},
});

export function ClientLink({ children, to, ...restProps }: LinkProps) {
  const onClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <Link href={to}>
      <a href={to} onClick={onClick} {...restProps}>
        {children}
      </a>
    </Link>
  );
}

export function ClientRouter({
  children,
  whileLoading,
}: PropsWithChildren<RouterProps>) {
  const { setRoute } = useContext(ClientRouterContext);
  const [loading, setLoading] = useState(true);
  const syncWithUrl = () => setRoute(window.location.pathname);

  useEffect(() => {
    syncWithUrl();

    window.onhashchange = () => syncWithUrl();
    window.addEventListener('popstate', syncWithUrl);
    setLoading(false);

    return () => window.removeEventListener('popstate', syncWithUrl);
  }, []);

  if (loading) return whileLoading || null;
  return children;
}

export function ClientRoute({ path, component }: RouteProps) {
  const { route } = useContext(ClientRouterContext);

  return path.startsWith(route) ? component : null;
}

export function ClientRouterProvider({
  initial,
  children,
}: PropsWithChildren<{ initial: string }>) {
  const [route, setRoute] = useState<string>(initial);
  const value = useMemo(() => {
    return { route, setRoute };
  }, [route]);

  return (
    <ClientRouterContext.Provider value={value}>
      {children}
    </ClientRouterContext.Provider>
  );
}
