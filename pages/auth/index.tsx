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
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
