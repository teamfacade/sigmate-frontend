import styled from 'styled-components';
import { AuthComponents, Divider, LogoWithLinks } from 'components/Auth';

export default function AuthPage() {
  return (
    <Wrapper>
      <AuthComponents />
      <Divider direction="column" separate={false} />
      <LogoWithLinks />
    </Wrapper>
  );
}

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
