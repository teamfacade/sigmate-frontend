import Link from 'next/link';
import styled from 'styled-components';
import styles, { BlueBtnStyle } from 'styles/styleLib';
import { Menu } from 'public/Icons/navbar';

export default function TopBar() {
  return (
    <Wrapper>
      <MenuBtn>
        <Menu />
      </MenuBtn>
      <Link href="/auth" passHref>
        <LaunchBtn>Sign in</LaunchBtn>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const MenuBtn = styled.button`
  border: none;
  background: none;
`;

const LaunchBtn = styled.button`
  ${BlueBtnStyle};
  padding: 14px 50px;
  height: auto;
  border-radius: 6px;
  font-size: 24px;
  font-weight: 600;
  line-height: 130%;
`;
