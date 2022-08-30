import {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useState,
  useRef,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Axios from 'lib/global/axiosInstance';
import { useAppDispatch, useAppSelector } from 'hooks/reduxStoreHooks';
import { setUserName } from 'store/modules/accountSlice';
import { InputTemplate, Divider, OAuthBtn } from 'components/auth';
import styles from 'styles/styleLib';

const usernameRules = '@todo Rules for username will be here';

export default function AccSetup() {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector(({ auth }) => auth);
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [isValidUsername, setIsValidUsername] = useState<boolean | undefined>(
    undefined
  );
  const [usernameCheckResult, setUsernameCheckResult] = useState(usernameRules);
  const [refCode, setRefCode] = useState('');
  const [isValidRefCode, setIsValidRefCode] = useState<boolean | undefined>(
    undefined
  );
  const usernameTextareaRef = useRef<HTMLTextAreaElement>(null);
  const refCodeTextareaRef = useRef<HTMLTextAreaElement>(null);

  const onChange: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      if (e.currentTarget.name === 'Username')
        setUsername(e.currentTarget.value);
      else setRefCode(e.currentTarget.value);
    },
    []
  );

  const onBlur: FocusEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      if (e.currentTarget.name === 'Username') {
        Axios.get('/user/check', {
          params: { userName: username },
          headers: { Authorization: `Bearer ${accessToken}` },
        })
          .then((res) => {
            setIsValidUsername(res.data.userName.isAvailable);
          })
          .catch((err) => {
            setIsValidUsername(false);
            if (err.response.status !== 400)
              alert('Something went wrong. Please try again later.');
          });
      } else if (refCode !== '') {
        Axios.get('/user/check', {
          params: { referralCode: refCode },
          headers: { Authorization: `Bearer ${accessToken}` },
        })
          .then((res) => {
            setIsValidRefCode(res.data.referralCode.isValid);
          })
          .catch((err) => {
            if (err.response.status === 400) setIsValidRefCode(false);
            else console.error(err.message);
          });
      }
    },
    [username, refCode, accessToken]
  );

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      if (e.currentTarget.name === 'Metamask') {
        // eslint-disable-next-line no-alert
        alert('Connect Metamask wallet');
      } else if ((isValidRefCode || refCode === '') && isValidUsername) {
        dispatch(setUserName(username));
        Axios.patch(
          '/user',
          { userName: username },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        ).then(() => router.push('/main'));
      } else if (!isValidUsername) usernameTextareaRef.current?.focus();
      else refCodeTextareaRef.current?.focus();
    },
    [isValidUsername, isValidRefCode, refCode]
  );

  return (
    <Wrapper>
      <InputTemplate
        name="Username"
        placeholder="Ex. John"
        onChange={onChange}
        onBlur={onBlur}
        isValid={isValidUsername}
        description={usernameCheckResult}
        ref={usernameTextareaRef}
      />
      <InputTemplate
        name="Referral Code"
        onChange={onChange}
        onBlur={onBlur}
        isValid={isValidRefCode}
        ref={refCodeTextareaRef}
      />
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
