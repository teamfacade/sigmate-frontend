import styled from 'styled-components';
import { OAuthBtn, Divider, EmailForm } from '.';

export default function AuthComponents() {
  return (
    <div>
      <Header>Log in / sign up</Header>
      <Wrapper>
        <span>
          <OAuthBtn service="google" />
          <OAuthBtn />
        </span>
        <Divider direction="row" separate />
        <EmailForm />
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;

  & button {
    position: relative;
    width: 100%;
    padding: 14px 0;
    margin-bottom: 12px;
    border-radius: 8px;
    border-width: 2px;
    border-style: solid;
    font-size: 15px;
    font-weight: 600;
  }
`;

const Header = styled.span`
  display: inline-block;
  margin-bottom: 16px;
  color: var(--logo-color);
  font-size: 22px;
  font-weight: bold;
`;
