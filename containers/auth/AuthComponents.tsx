import { useCallback, MouseEventHandler } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import { OAuthBtn } from 'components/auth';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

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
          alert('Metamask Login');
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

  const checkIfUserRegistered = async (address: string) => {
    return true;
  };

  const connectToMetamask = async () => {
    try {
      // Connect to metamask and get user accounts

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // // Update vuex store
      // this.$store.commit('metamask/setMetamaskConnected', true)
      // this.$store.commit('metamask/setAccounts', accounts)

      // // Check if user is registered, if not, register them
      // const isRegistered = await checkIfUserRegistered(accounts[0])

      // // Request nonce from backend
      // const responseNonce = await this.$axios.get('/users/' + accounts[0] + '/nonce')
      // const nonce = responseNonce.data
      // // Sign message
      // const signedMessage = await this.handleSignMessage(accounts[0], nonce)
      // // Send signature to backend
      // const responseSign = await this.$axios.post('/users/' + accounts[0] + '/signature', signedMessage)
      // // Set token in store
      // this.$store.commit('metamask/setToken', responseSign.data.token)
      // // If successful, redirect to home
      // if (responseSign.status === 200) {
      //   this.$router.push('/')
      // }
    } catch (error) {
      console.log(error);
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
