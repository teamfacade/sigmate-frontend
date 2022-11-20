import {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useState,
  useRef,
  FormEventHandler,
  useMemo,
  useEffect,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { connectToMetaMask } from 'lib/global/connectMetamask';
import { useAppDispatch, useAppSelector } from 'hooks/reduxStoreHooks';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import {
  setUserName,
  setMetamaskWallet,
  setAgreeTerms,
  setReferredBy,
} from 'store/modules/accountSlice';
import { InputTemplate, Divider, OAuthBtn } from 'components/auth';
import { DisclaimWrapper } from 'components/main/wiki/edit';
import styles from 'styles/styleLib';

const usernameRules: StringKeyObj<string> = {
  default: 'Username should be more than 2, less than 17 characters',
  REQUIRED: "Username can't be empty",
  TOO_SHORT: 'Username should be more than 2 characters',
  TOO_LONG: 'Username should be less than 17 characters',
  ERR_USERNAME_ILLEGAL_CHARS:
    'We only allow alphanumeric characters, underscores, dashes, and periods',
  ERR_USERNAME_CONSECUTIVE_SPECIAL_CHARS:
    'Special characters cannot appear more than 2 times in a row',
  ERR_USERNAME_START_OR_END_WITH_SPECIAL_CHARS:
    'Username cannot start nor end with a special character',
  ERR_USERNAME_ILLEGAL_WORDS: "You can't contain some words in username",
  ERR_USERNAME_IS_URL: 'Username cannot be a URL',
  DUPLICATE: 'This name is already being used by someone else.',
};

const referralRules: StringKeyObj<string> = {
  default: '',
  NOT_REFERRAL_CODE: "This code doesn't follow the referral code format",
  REFERRED_USER_NOT_FOUND: "User with given referral code doesn't exist",
};

type PropsType = {
  signedWithMetamask: boolean;
};

export default function AccSetup({ signedWithMetamask }: PropsType) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { googleAccount, metamaskWallet } = useAppSelector(
    ({ account }) => account
  );
  const [username, setUsername] = useState('');
  const [isValidUsername, setIsValidUsername] = useState<boolean | undefined>(
    undefined
  );
  const [usernameCheckResult, setUsernameCheckResult] = useState(
    usernameRules.default
  );
  const [refCode, setRefCode] = useState('');
  const [isValidRefCode, setIsValidRefCode] = useState<boolean | undefined>(
    undefined
  );
  const [refCodeCheckResult, setRefCodeCheckResult] = useState(
    referralRules.default
  );
  const usernameTextareaRef = useRef<HTMLTextAreaElement>(null);
  const refCodeTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (refCodeTextareaRef.current) {
      const result = localStorage.getItem('refCode');
      if (result) {
        setRefCode(result);
        refCodeTextareaRef.current.value = result;
      }
    }
  }, []);

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
        dispatch(
          AuthRequiredAxios({
            method: 'GET',
            url: `/user/check?userName=${username}`,
          })
        ).then((action: any) => {
          const { status, data } = action.payload;
          setIsValidUsername(status === 200);
          if (status === 200) {
            setUsernameCheckResult('');
          } else if (status === 400) {
            if (data.userName?.isAvailable === false)
              setUsernameCheckResult(usernameRules.DUPLICATE);
            else
              setUsernameCheckResult(
                usernameRules[data.validationErrors[0].msg || 'default']
              );
          } else if (action.payload.status === 500)
            alert(action.payload.data.msg);
        });
      } else if (refCode !== '') {
        dispatch(
          AuthRequiredAxios({
            method: 'GET',
            url: `/user/check?referralCode=${refCode}`,
          })
        ).then((action: any) => {
          const { status, data } = action.payload;
          setIsValidRefCode(status === 200);
          if (status === 200) {
            setRefCodeCheckResult('');
          } else if (status === 400) {
            setRefCodeCheckResult(referralRules.REFERRED_USER_NOT_FOUND);
          } else if (action.payload.status === 500)
            alert(action.payload.data.msg);
        });
      }
    },
    [username, refCode]
  );

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      const { name } = e.currentTarget;
      if (name === 'Metamask') {
        // eslint-disable-next-line no-alert
        connectToMetaMask(dispatch).then((action) => {
          if (action.payload.status === 200)
            dispatch(setMetamaskWallet(action.payload.data.metamaskWallet));
        });
      } else if (name === 'Google') {
        alert('Coming soon...');
      }
    },
    []
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      if ((isValidRefCode || refCode === '') && isValidUsername) {
        const now = new Date(Date.now()).toISOString();
        const data: any = {
          userName: username,
          agreeTos: now,
          agreePrivacy: now,
        };
        if (refCode !== '') data.referredBy = refCode;
        dispatch(
          AuthRequiredAxios({
            method: 'PATCH',
            url: '/user',
            data,
          })
        ).then(async (action: any) => {
          if (action.payload.status === 200) {
            console.log(action.payload);
            dispatch(setAgreeTerms(now));
            dispatch(setReferredBy(refCode));
            dispatch(setUserName(username));
            await router.push('/main/wiki/Sigmate');
          } else
            alert(
              `Error while creating a user.\r\nERR: ${action.payload.status}-${
                (action.payload.data.validationErrors[0] || action.payload.data)
                  .msg
              }`
            );
        });
      } else if (!isValidUsername) usernameTextareaRef.current?.focus();
      else {
        refCodeTextareaRef.current?.focus();
        if (refCodeTextareaRef.current?.value !== '')
          refCodeTextareaRef.current?.blur();
      }
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
        description={refCodeCheckResult}
        ref={refCodeTextareaRef}
      />
      <Divider direction="row" separate={false} />
      <Name>{`Connect ${signedWithMetamask ? 'Google' : 'Wallet'}`}</Name>
      <OAuthBtn
        service={signedWithMetamask ? 'Google' : 'Metamask'}
        done={signedWithMetamask ? !!googleAccount : !!metamaskWallet}
        onClick={onClick}
        width="470px"
        height="61px"
      />
      {!signedWithMetamask && (
        <WalletDescription>
          Connect to receive rewards based on your activity.{' '}
          <Link href="https://naver.com">
            <a>Learn more</a>
          </Link>
        </WalletDescription>
      )}
      <form onSubmit={onSubmit} style={{ paddingTop: '16px' }}>
        <DisclaimWrapper>
          <input type="checkbox" required />
          <span>
            {'I am 18 years of age or older and agree to the '}
            <a href="https://www.naver.com" target="_blank" rel="noreferrer">
              Sigmate terms of service.
            </a>
          </span>
        </DisclaimWrapper>
        <DisclaimWrapper>
          <input type="checkbox" required />
          <span>
            {'I agree to the '}
            <a href="https://www.naver.com" target="_blank" rel="noreferrer">
              Sigmate Privacy Policy.
            </a>
          </span>
        </DisclaimWrapper>
        <SignUp name="SignUp" type="submit">
          Sign Up
        </SignUp>
      </form>
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
