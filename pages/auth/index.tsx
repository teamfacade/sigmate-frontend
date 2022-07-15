import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import dynamic from 'next/dynamic';
import { Divider, LogoWithLinks, AdditionalInfo } from 'components/Auth';

export default function AuthPage() {
  return (
    <Wrapper>
      <AuthComponents />
      {/* if there's no user name in received user info token */}
      <CSSTransition in={false} timeout={300} classNames="swap" unmountOnExit>
        <AdditionalInfo />
      </CSSTransition>
      <Divider direction="column" separate={false} />
      <LogoWithLinks />
    </Wrapper>
  );
}

/*
    To use window object in react code, prevent ssr of the component.
    https://velog.io/@taese0ng/Next.js-window%EA%B0%9D%EC%B2%B4%EA%B0%80-%EC%97%86%EB%8B%A4%EA%B3%A0%ED%95%A0%EB%95%8C
*/
const AuthComponents = dynamic(() => import('components/Auth/AuthComponents'), {
  ssr: false,
});

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap-reverse;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 640px) {
    display: inline-block;
    overflow: hidden;
  }
`;
