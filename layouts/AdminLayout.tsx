import { ReactNode } from 'react';
import styled from 'styled-components';
import { SideItem } from 'components/admin';

type PropsType = {
  children: ReactNode;
};

export default function AdminLayout({ children }: PropsType) {
  return (
    <Wrapper>
      <SideItemsWrapper>
        <SideItem name="User management" path="user" />
        <SideItem name="Content management" path="content" />
        <SideItem name="Minting schedule" path="minting-schedule" />
        <SideItem name="New mint" path="new-mint" />
        <SideItem name="Create category" path="create-category" />
      </SideItemsWrapper>
      <ContentWrapper>{children}</ContentWrapper>
    </Wrapper>
  );
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
