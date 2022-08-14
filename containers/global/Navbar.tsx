import Link from 'next/link';
import styled from 'styled-components';
import { Links, Profile } from 'components/Navbar';
import styles from 'styles/styleLib';

export default function Navbar() {
  return (
    <nav>
      <Wrapper>
        <Link href="/main">
          <Logo>sigmate</Logo>
        </Link>
        <Links />
        <Link href="/user">
          <a>
            <Profile name="WK seo" description="Design Manager" />
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
  padding: 0 30px;
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
