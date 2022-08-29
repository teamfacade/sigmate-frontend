import Link from 'next/link';
import styled from 'styled-components';
import { useAppSelector } from 'hooks/reduxStoreHooks';
import { Links, Profile } from 'components/Navbar';
import styles from 'styles/styleLib';

// @todo 프로필 정보 사용자 정보로 변경
export default function Navbar() {
  const { userName, primaryProfile } = useAppSelector(({ account }) => account);
  const { signedIn } = useAppSelector(({ auth }) => auth);

  return (
    <nav>
      <Wrapper>
        <Link href="/main">
          <Logo>sigmate</Logo>
        </Link>
        <Links />
        <Link href={`${signedIn ? '/user' : '/auth'}`}>
          <a>
            <Profile
              PFPUrl={primaryProfile.profileImageUrl}
              name={primaryProfile.displayName || userName}
              description="Example"
            />
          </a>
        </Link>
      </Wrapper>
    </nav>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4rem;
  padding: 0 70px;
  margin: 15px 0;
  background-color: transparent;

  a {
    text-decoration: none;
  }
`;

const Logo = styled.a`
  margin: 0 40px 0 0;
  color: ${styles.colors.logoColor};
  font-size: 35px;
  font-weight: 500;
  font-family: 'Claris Sans', sans-serif;
  cursor: pointer;
`;
