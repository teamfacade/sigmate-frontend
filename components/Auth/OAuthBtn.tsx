import styled from 'styled-components';
import { MouseEventHandler } from 'react';
import { google } from 'public/Icons';
import colors from 'styles/colorLib';

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
  color: ${colors.googleNameColor};
  background-color: ${colors.googleBackgroundColor};
  border-color: ${colors.googleBorderColor};
`;

const MetamaskBtn = styled.button`
  color: ${colors.metamaskNameColor};
  background-color: ${colors.metamaskBackgroundColor};
  border-color: ${colors.metamaskBorderColor};
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
