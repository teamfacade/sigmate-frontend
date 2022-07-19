import { ReactNode, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ClientRouterProvider, ClientRouter } from 'hooks/useSPARouting';
import { SideItem } from 'components/user/Layout';
import colors from '../styles/colorLib';

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
              IconName="Calender"
              Content="Calendar"
              Active={current === 'calender'}
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
  padding: 0 30px 30px 30px;
`;

const SideItemsWrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: center;
  background-color: transparent;
`;

const ContentWrapper = styled.div`
  position: relative;
  display: inline-block;
  max-width: 1000px;
  margin-right: 20px;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 ${colors.containerShadow};
  overflow: hidden;
`;
