import styled from 'styled-components';
import { OAuthBtn, Divider, EmailForm } from '.';

export default function AuthComponents() {
  return (
    <div>
      <h1>Log in / sign up</h1>
      <Wrapper>
        <div>
          <OAuthBtn service="google" />
        </div>
        <Divider direction="row" separate />
        <EmailForm />
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
