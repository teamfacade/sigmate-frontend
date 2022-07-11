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
  margin: auto;
`;
