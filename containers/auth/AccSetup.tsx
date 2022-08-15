import {
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useState,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { InputTemplate, Divider, OAuthBtn } from 'components/auth';
import styles from '../../styles/styleLib';

export default function AccSetup() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [refCode, setRefCode] = useState('');

  const onChange: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      if (e.currentTarget.name === 'Username')
        setUsername(e.currentTarget.value);
      else setRefCode(e.currentTarget.value);
    },
    []
  );

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      if (e.currentTarget.name === 'Metamask') {
        // eslint-disable-next-line no-alert
        alert('Connect Metamask wallet');
      } else {
        // eslint-disable-next-line no-alert
        alert('Signed up...');
        await router.push('/main');
      }
    },
    []
  );

  return (
    <Wrapper>
      <InputTemplate
        name="Username"
        placeholder="Ex. John"
        onChange={onChange}
      />
      <InputTemplate name="Referral Code" onChange={onChange} />
      <Divider direction="row" separate={false} />
      <Name>Connect Wallet</Name>
      <OAuthBtn
        service="Metamask"
        onClick={onClick}
        width="470px"
        height="61px"
      />
      <WalletDescription>
        Connect to receive rewards based on your activity.{' '}
        <Link href="https://naver.com">
          <a>Learn more</a>
        </Link>
      </WalletDescription>
      <SignUp name="SignUp" onClick={onClick}>
        Sign Up
      </SignUp>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Name = styled.p`
  margin: 30px 0 20px 0;
  color: ${styles.colors.logoColor};
  font-size: 20px;
  font-weight: bold;
`;

const WalletDescription = styled.p`
  margin: 10px 0 0 0;
  color: #aeaeae;
  font-size: 16px;

  a {
    color: ${styles.colors.emphColor};
    font-size: 16px;
  }
`;

const SignUp = styled.button`
  width: 470px;
  height: 61px;
  padding: 19px 200px;
  margin-top: 30px;
  border: none;
  border-radius: 8px;
  background-color: ${styles.colors.emphColor};
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
`;
