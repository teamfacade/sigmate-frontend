import { useCallback, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { OAuthBtn } from '.';
import GoogleLogin from './GoogleLogin';

declare global {
  interface Window {
    google: any;
  }
}

export default function AuthComponents() {
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    switch (e.currentTarget.name) {
      case 'google':
        window.google.accounts.id.prompt();
        break;
      default:
        // eslint-disable-next-line no-alert
        alert('Comming soon');
    }
  }, []);

  return (
    <div>
      <Header>Log in / sign up</Header>
      <Wrapper>
        <span>
          <GoogleLogin />
          <OAuthBtn service="google" onClick={onClick} />
          <OAuthBtn />
        </span>
        {/*
        <Divider direction="row" separate />
        <EmailForm />
      */}
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 250px;
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
