import { ReactNode, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ClientRouterProvider, ClientRouter } from 'hooks/useSPARouting';
import { SideItem } from 'components/user/Layout';

type PropsType = {
  children: ReactNode;
};

export default function UserLayout({ children }: PropsType) {
  const [current, setCurrent] = useState('');
  const syncWithUrl = () => setCurrent(window.location.pathname.split('/')[2]);

  useEffect(() => {
    syncWithUrl();
    window.addEventListener('popstate', syncWithUrl);

    return () => window.removeEventListener('popstate', syncWithUrl);
  }, []);

  return (
    <ClientRouterProvider initial="/user">
      <ClientRouter>
        <Wrapper>
          <SideItemsWrapper>
            <SideItem IconName="Account" Content="Account" Active={!current} />
            <SideItem
              IconName="Points"
              Content="Points"
              Active={current === 'points'}
            />
            <SideItem
              IconName="Edits"
              Content="Edits"
              Active={current === 'edits'}
            />
            <SideItem
              IconName="Referrals"
              Content="Referrals"
              Active={current === 'referrals'}
            />
            <SideItem
              IconName="Staking"
              Content="Staking"
              Active={current === 'staking'}
            />
            <SideItem
              IconName="Calendar"
              Content="Calendar"
              Active={current === 'calendar'}
            />
          </SideItemsWrapper>
          <ContentWrapper>{children}</ContentWrapper>
        </Wrapper>
      </ClientRouter>
    </ClientRouterProvider>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 0 40px 90px 40px;
`;

const SideItemsWrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: flex-start;
  background-color: transparent;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
