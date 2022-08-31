import { useCallback, MouseEventHandler } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import { OAuthBtn } from 'components/auth';
import axios from 'axios';
import Web3 from 'web3';

const baseURL = 'http://172.30.1.27:5100/api/v1';

export default function AuthComponents() {
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
          // alert('Metamask Login');
          performAction();
          break;
        default:
          // eslint-disable-next-line no-alert
          alert('Comming soon');
      }
    },
    []
  );

  const performAction = () => {
    if (window.ethereum) {
      connectToMetamask();
    } else {
      // Redirect to metamask install page
      window.open('https://metamask.io/');
    }
  };

  const handleSignMessage = (publicAddress: string, nonce: number) => {
    // Define instance of web3
    const web3 = new Web3(window.ethereum);
    return new Promise((resolve, reject) => {
      web3.eth.personal.sign(
        web3.utils.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
        publicAddress,
        'skanskan',
        (err, signature) => {
          if (err) reject(err);
          resolve({ publicAddress, signature });
        }
      );
    });
  };

  const connectToMetamask = async () => {
    try {
      // Connect to metamask and get user accounts

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const res = await axios.get(`${baseURL  }/auth/metamask`, {
        params: {
          metamaskWallet: accounts[0],
        },
      });

      if (res.data) {
        const {nonce} = res.data;
        // Sign message
        const signedMessage = await handleSignMessage(accounts[0], nonce);

        // Send signature to backend
        await axios.post(`${baseURL  }/auth/metamask/verify`, {
          metamaskWallet: accounts[0],
          signature: signedMessage,
        });
      }
      return true;
    } catch (error) {
      // TODO 해줘
      return false;
    }
  };

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
