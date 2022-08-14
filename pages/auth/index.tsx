import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { LogoWithLinks } from 'containers/auth';
import { Divider } from 'components/auth';

export default function AuthPage() {
  return (
    <div style={{ height: '100vh' }}>
      <Wrapper>
        <AuthComponents />
        <LogoWithLinks />
      </Wrapper>
    </div>
  );
}

/*
    To use window object in react code, prevent ssr of the component.
    https://velog.io/@taese0ng/Next.js-window%EA%B0%9D%EC%B2%B4%EA%B0%80-%EC%97%86%EB%8B%A4%EA%B3%A0%ED%95%A0%EB%95%8C
*/
const AuthComponents = dynamic(() => import('containers/auth/AuthComponents'), {
  ssr: false,
});

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap-reverse;
  position: relative;
  height: 100%;

  @media (max-width: 640px) {
    display: inline-block;
    overflow: hidden;
  }
`;
