import { useCallback, MouseEventHandler, useState, useEffect } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import { OAuthBtn } from 'components/auth';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Web3 from 'web3';

const API_DOMAIN = 'http://localhost:5100';
const BASE_URL = `${API_DOMAIN}/api/v1`;

export default function AuthComponents() {
  // 메타마스크로 로그인 이미 진행중인지 여부 (true 일 경우 버튼 disable 시켜야함)
  const [isMetaMaskLoginInProgress, setMetaMaskLoginInProgress] =
    useState<boolean>(false);

  // @todo OAuth 기능 구현
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      switch (e.currentTarget.name) {
        case 'Google':
          // eslint-disable-next-line no-alert
          alert('Google Login');
          break;
        case 'Metamask':
          // eslint-disable-next-line no-alert
          startMetaMaskLogin();
          break;
        default:
          // eslint-disable-next-line no-alert
          alert('Comming soon');
      }
    },
    []
  );

  // 메타마스크 설치여부 확인
  const isMetaMaskInstalled = () => {
    return Boolean(window?.ethereum?.isMetaMask);
  };

  // 메타마스크 로그인 최종 성공시 실행되는 callback
  const handleMetaMaskLoginSuccess = (
    metamaskResponse: MetamaskAuth.MetaMaskVerifyResponse
  ) => {
    // eslint-disable-next-line no-console
    console.log(metamaskResponse); // @todo 유저정보랑 토큰 여깄음!
    setMetaMaskLoginInProgress(false);
    return true;
  };

  // 메타마스크 로그인 중 오류 발생시 실행되는 callback
  const handleMetaMaskLoginFail = () => {
    setMetaMaskLoginInProgress(false);
    return false;
  };

  // 메타마스크로 로그인 과정을 이미 시작하지 않은 경우에만 새로 시작
  const startMetaMaskLogin = () => {
    setMetaMaskLoginInProgress(true);
  };

  const signMetaMaskMessage = async (
    publicAddress: string,
    nonce: number
  ): Promise<string> => {
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
  };

  const connectToMetaMask = async () => {
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
  };

  useEffect(() => {
    if (!isMetaMaskLoginInProgress) return;

    if (isMetaMaskInstalled()) {
      // Start login
      connectToMetaMask();
    } else {
      // MetaMask is not installed on user's browser.
      // Redirect to metamask install page
      window.open('https://metamask.io/download/');
      handleMetaMaskLoginFail();
    }
  }, [isMetaMaskLoginInProgress]);

  return (
    <div>
      <Header>Log in / sign up</Header>
      <BtnWrapper>
        <span>
          <OAuthBtn service="Google" onClick={onClick} />
          <OAuthBtn service="Metamask" onClick={onClick} />
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
