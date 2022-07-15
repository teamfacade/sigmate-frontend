import styled from 'styled-components';
import { google } from 'public/Icons';
import { MouseEventHandler } from 'react';

type PropsType = {
  service?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function OAuthBtn({ service = '', onClick }: PropsType) {
  switch (service) {
    case 'google':
      return (
        <GoogleBtn name={service} onClick={onClick}>
          <Google />
          Continue with Google
        </GoogleBtn>
      );
    case 'metamask':
      return (
        <MetamaskBtn name={service} onClick={onClick}>
          Continue with Metamask
        </MetamaskBtn>
      );
    default:
      return (
        <Preparing name={service} onClick={onClick}>
          Coming soon...
        </Preparing>
      );
  }
}

const GoogleBtn = styled.button`
  color: var(--button-google-name-color);
  background-color: var(--button-google-background-color);
  border-color: var(--button-google-border-color);
`;

const MetamaskBtn = styled.button`
  color: var(--button-metamask-name-color);
  background-color: var(--button-metamask-background-color);
  border-color: var(--button-metamastk-border-color);
`;

const Preparing = styled.button`
  color: gray;
  background-color: #eeeeee;
  border-color: #8a8a8a;
`;

const Google = styled(google)`
  width: 24px;
  position: absolute;
  top: 48%;
  right: 50%;
  transform: translate(-370%, -50%);
`;
