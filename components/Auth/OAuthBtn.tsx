import styled from 'styled-components';
import google from 'public/Icons/Google_Logo.svg';

type PropsType = {
  service?: string;
};

export default function OAuthBtn({ service = '' }: PropsType) {
  switch (service) {
    case 'google':
      return (
        <GoogleBtn>
          <Google />
          Continue with Google
        </GoogleBtn>
      );
    case 'metamask':
      return <MetamaskBtn>Continue with Metamask</MetamaskBtn>;
    default:
      return <Preparing>Coming soon...</Preparing>;
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
  border-color: #7c7c7c;
`;

const Google = styled(google)`
  width: 24px;
  position: absolute;
  top: 48%;
  right: 50%;
  transform: translate(-370%, -50%);
`;
