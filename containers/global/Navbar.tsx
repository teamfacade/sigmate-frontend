import { MouseEventHandler, useCallback, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from 'hooks/reduxStoreHooks';
import { signOut } from 'store/modules/authSlice';
import { Links, Profile } from 'components/Navbar';
import styles from 'styles/styleLib';

// @todo 프로필 정보 사용자 정보로 변경
export default function Navbar() {
  const dispatch = useAppDispatch();
  const { userName, primaryProfile, group } = useAppSelector(
    ({ account }) => account
  );
  const { signedIn } = useAppSelector(({ auth }) => auth);
  const [showMenu, setShowMenu] = useState(false);

  const onClickSignOut: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => dispatch(signOut()),
    []
  );

  const onClickShowMenu: MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement
  > = useCallback((e) => {
    if (e.currentTarget.name !== 'BlurBg' || e.target === e.currentTarget)
      setShowMenu((current) => !current);
  }, []);

  const onClickSideLinks: MouseEventHandler<HTMLAnchorElement> = useCallback(
    () => setTimeout(() => setShowMenu(false), 300),
    []
  );

  return (
    <>
      <nav>
        <Wrapper>
          <Link href="/main/wiki/Sigmate">
            <Logo>Sigmate</Logo>
          </Link>
          <SideHidingWrapper showMenu={showMenu}>
            <Links onClickShowMenu={onClickSideLinks} />
            <Profile
              signedIn={signedIn}
              onClickSignOut={onClickSignOut}
              onClickLink={onClickSideLinks}
              PFPUrl={primaryProfile?.profileImageUrl || ''}
              name={primaryProfile?.displayName || userName}
              description={group.groupName}
            />
          </SideHidingWrapper>
          <MenuBtn onClick={onClickShowMenu}>
            <p>&equiv;</p>
          </MenuBtn>
        </Wrapper>
      </nav>
      <TestBlur name="BlurBg" showMenu={showMenu} onClick={onClickShowMenu} />
    </>
  );
}

const TestBlur = styled.button<{ showMenu: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: ${({ showMenu }) => (showMenu ? 'block' : 'none')};
  background: none;
  border: none;
  width: 100%;
  height: 100%;
  z-index: 2;
  backdrop-filter: blur(10px);
  cursor: default !important;
`;

const SideHidingWrapper = styled.div<{ showMenu: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 1280px) {
    position: fixed;
    top: 0;
    right: ${({ showMenu }) => (showMenu ? '0' : '-200%')};
    width: 320px;
    padding: 20px 56px 20px 20px;
    flex-wrap: wrap-reverse;
    justify-content: flex-start;
    background: #ffffff;
    transition: right 300ms ease-in-out;
    z-index: 3;
    box-shadow: 1px 0 3px ${styles.colors.darkBorderColor};
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4rem;
  margin: 15px 0;
  background-color: transparent;

  @media (min-width: 728px) {
    padding: 0 40px;
  }
  @media (max-width: 728px) {
    padding: 0 20px;
  }

  a {
    text-decoration: none;
  }
`;

const Logo = styled.a`
  margin: 0;
  color: ${styles.colors.logoColor};
  font-size: 35px;
  font-weight: 500;
  font-family: 'Claris Sans', sans-serif;
  cursor: pointer;
`;

const MenuBtn = styled.button`
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: #f7f8fa;

  p {
    margin: 0;
    color: ${styles.colors.logoColor};
    font-size: 24px;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
    line-height: 160%;
  }

  @media (min-width: 1280px) {
    display: none;
  }
  @media (max-width: 1280px) {
    display: flex;
  }
`;
