import { ReactNode } from 'react';
import styled from 'styled-components';

type PropsType = {
  children: ReactNode;
};

export default function Layout({ children }: PropsType) {
  return (
    <NavBar>
      <main>{children}</main>
    </NavBar>
  );
}

const NavBar = styled.div``;
