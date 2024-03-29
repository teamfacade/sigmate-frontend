import { ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { SideItem } from 'components/admin';
import { useRouter } from 'next/router';
import { useAppSelector } from '../hooks/reduxStoreHooks';
import { store } from '../store/store';

type PropsType = {
  children: ReactNode;
};

export default function AdminLayout({ children }: PropsType) {
  const router = useRouter();
  const { isAdmin } = useAppSelector(({ account }) => account);

  useEffect(() => {
    setTimeout(() => {
      if (
        (store.getState() as ReduxState.RootStateType).account.isAdmin === false
      )
        router.back();
    }, 700);
  }, []);

  if (isAdmin)
    return (
      <Wrapper>
        <SideItemsWrapper>
          <SideItem name="User management" path="user" />
          <SideItem name="Content management" path="content" />
          <SideItem name="Confirmed collections" path="confirmed" />
          <SideItem name="Unconfirmed collections" path="unconfirmed" />
          <SideItem name="Minting schedule" path="minting-schedule" />
          <SideItem name="Forum management" path="forum" />
        </SideItemsWrapper>
        <ContentWrapper>{children}</ContentWrapper>
      </Wrapper>
    );
  return <div />;
}

const Wrapper = styled.div`
  display: flex;
  padding: 0 40px 90px 40px;
`;

const SideItemsWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: flex-start;
  margin-right: 20px;
  background-color: transparent;

  a:not(:first-child) button {
    margin-top: 20px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
