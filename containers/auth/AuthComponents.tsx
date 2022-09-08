import { useEffect, useCallback, useState, MouseEventHandler } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import Axios from 'lib/global/axiosInstance';
import { signIn, setAuthTokens } from 'store/modules/authSlice';
import { useAppDispatch } from 'hooks/reduxStoreHooks';
import { OAuthBtn } from 'components/auth';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Web3 from 'web3';

const API_DOMAIN = 'http://api.sigmate.io:5100';
const BASE_URL = `${API_DOMAIN}/api/v1`;

export default function AuthComponents() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isSignInProgress, setSignInProgress] = useState<boolean>(false);

  useEffect(() => {
    if (Object.keys(router.query).length) {
      setSignInProgress(true);
      Axios.post('/auth/google', {
        code: router.query.code,
      })
        .then(async (res) => {
          dispatch(signIn(res.data.user)).then(() =>
            dispatch(
              setAuthTokens({
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
              })
            )
          );
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setSignInProgress(false);
          window.history.replaceState({}, document.title, '/auth');
        });
    }
  }, [router]);

  // @todo OAuth 기능 구현
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      switch (e.currentTarget.name) {
        case 'Google':
          router.replace(`${API_DOMAIN}/oauth/google`);
          break;
        case 'Metamask':
          if (!isSignInProgress && window?.ethereum?.isMetaMask) {
            // Start login
            setSignInProgress(true);
            connectToMetaMask();
          } else {
            // MetaMask is not installed on user's browser.
            // Redirect to metamask install page
            window.open('https://metamask.io/download/');
            handleMetaMaskLoginFail();
          }
          break;
        default:
          // eslint-disable-next-line no-alert
          alert('Comming soon');
      }
    },
    [isSignInProgress]
  );

  // 메타마스크 로그인 최종 성공시 실행되는 callback
  const handleMetaMaskLoginSuccess = useCallback(
    (metamaskResponse: MetamaskAuth.MetaMaskVerifyResponse) => {
      // eslint-disable-next-line no-console
      console.log(metamaskResponse); // @todo 유저정보랑 토큰 여깄음!
      dispatch(signIn(metamaskResponse.user)).then(() =>
        dispatch(
          setAuthTokens({
            accessToken: metamaskResponse.accessToken || '',
            refreshToken: metamaskResponse.refreshToken || '',
          })
        )
      );
      setSignInProgress(false);
      return true;
    },
    []
  );

  // 메타마스크 로그인 중 오류 발생시 실행되는 callback
  const handleMetaMaskLoginFail = useCallback(() => {
    setSignInProgress(false);
    return false;
  }, []);

  const signMetaMaskMessage = useCallback(
    async (publicAddress: string, nonce: number): Promise<string> => {
      if (!window.ethereum) {
        handleMetaMaskLoginFail();
        throw new Error();
      }
      // Define instance of web3
      const web3 = new Web3(window.ethereum as any);

      // Sign personal message
      return new Promise((resolve, reject) => {
        web3.eth.personal.sign(
          web3.utils.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
          publicAddress,
          'skanskan',
          (err, signature) => {
            if (err) reject(err);
            resolve(signature);
          }
        );
      });
    },
    []
  );

  const connectToMetaMask = useCallback(async () => {
    // This function can't be called. It is for type assertion.
    if (!window.ethereum) return handleMetaMaskLoginFail();

    // METAMASK LOGIN FLOW (1/4)
    // Get user's public address
    let publicAddress = ''; // MetaMask wallet address
    try {
      const accounts = await window.ethereum.request<[string]>({
        method: 'eth_requestAccounts',
      });
      if (accounts && accounts[0]) {
        [publicAddress] = accounts;
      } else {
        // Failed to retrieve user's account from MetaMask
        return handleMetaMaskLoginFail();
      }
    } catch (e) {
      const error = e as any;
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // User cancelled the login
        return handleMetaMaskLoginFail();
      }
      // Error while logging in
      return handleMetaMaskLoginFail();
    }

    // METAMASK LOGIN FLOW (2/4)
    // Fetch MetaMask one-time nonce from backend
    let nonce = 0;
    try {
      const res: AxiosResponse<MetamaskAuth.MetaMaskAuthResponse> =
        await axios.get('/auth/metamask', {
          baseURL: BASE_URL,
          params: {
            metamaskWallet: publicAddress,
          },
        });

      if (res?.data) {
        if (res.data.metamaskWallet !== publicAddress) {
          // Login failed due to publicAddress mismatch
          return handleMetaMaskLoginFail();
        }
        nonce = res.data.nonce; // Got the nonce
      } else {
        // Login failed due to axios issues
        return handleMetaMaskLoginFail();
      }
    } catch (error) {
      // Login failed due to our backend issue
      return handleMetaMaskLoginFail();
    }

    // METAMASK LOGIN FLOW (3/4)
    // Sign message to create signature
    let signedMessage = '';
    try {
      signedMessage = await signMetaMaskMessage(publicAddress, nonce);

      if (!signedMessage) return handleMetaMaskLoginFail();
    } catch (error) {
      // Login failed due to web3.js module issues
      return handleMetaMaskLoginFail();
    }

    // METAMASK LOGIN FLOW (4/4)
    // Send signature to backend for verification
    try {
      const res: AxiosResponse<MetamaskAuth.MetaMaskVerifyResponse> =
        await axios.post(
          '/auth/metamask/verify',
          {
            metamaskWallet: publicAddress,
            signature: signedMessage,
          },
          {
            baseURL: BASE_URL,
          }
        );

      if (res?.data) {
        const { success, accessToken, refreshToken } = res.data;

        if (!success || !accessToken || !refreshToken) {
          // Login failed due to our backend issues
          return handleMetaMaskLoginFail();
        }

        // If we reached here, verification success!
        handleMetaMaskLoginSuccess(res.data);
      } else {
        // Login failed due to axios issues
        return handleMetaMaskLoginFail();
      }
    } catch (e) {
      const error = e as AxiosError;
      if (error?.response?.status === 401) {
        // Login failed due to invalid signature
        return handleMetaMaskLoginFail();
      }
      // Login failed due to our backend issues
      return handleMetaMaskLoginFail();
    }

    // If we reached here, login success!
    return true;
  }, []);

  return (
    <div>
      <Header>Log in / sign up</Header>
      <BtnWrapper>
        <span>
          <OAuthBtn
            service="Google"
            onClick={onClick}
            disabled={isSignInProgress}
          />
          <OAuthBtn
            service="Metamask"
            onClick={onClick}
            disabled={isSignInProgress}
          />
        </span>
      </BtnWrapper>
    </div>
  );
}

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.span`
  display: inline-block;
  margin-bottom: 25px;
  color: ${styles.colors.logoColor};
  font-size: 22px;
  font-weight: bold;
`;
