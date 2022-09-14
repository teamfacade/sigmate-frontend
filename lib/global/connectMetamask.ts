import { AppDispatch } from 'store/store';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import Web3 from 'web3';

const handleMetaMaskLoginFail = () =>
  Promise.reject({
    status: 400,
    data: {
      msg: '',
    },
  });

// METAMASK LOGIN FLOW (1/4)
// Get user's public address
const getPublicAddress = async () => {
  // This function can't be called. It is for type assertion.
  if (!window.ethereum) return handleMetaMaskLoginFail();
  try {
    const accounts = await window.ethereum.request<[string]>({
      method: 'eth_requestAccounts',
    });
    if (accounts && accounts[0]) {
      return accounts[0];
    } 
      // Failed to retrieve user's account from MetaMask
      return handleMetaMaskLoginFail();
    
  } catch (e) {
    const error = e as any;
    if (error.code === 4001) {
      // EIP-1193 userRejectedRequest error
      // User cancelled the login
      return Promise.reject({ status: 4001 });
    }
    // Error while logging in
    return handleMetaMaskLoginFail();
  }
};

// METAMASK LOGIN FLOW (2/4)
// Fetch MetaMask one-time nonce from backend
const getNonce: (
  dispatch: AppDispatch,
  publicAddress: string
) => Promise<any> = async (dispatch: AppDispatch, publicAddress: string) => {
  return dispatch(
    AuthRequiredAxios({
      method: 'GET',
      url: `/user/connect/metamask?metamaskWallet=${publicAddress}`,
    })
  ).then((action: any) => {
    const { status, data } = action.payload;

    if (status === 200) return Number.parseInt(data.nonce, 10);
    if (status === 409) {
      if (data.msg === 'ERR_METAMASK_ALREADY_MY_ADDRESS')
        alert('You already connected a wallet.');
      else if (data.msg === 'ERR_METAMASK_ALREADY_EXISTS')
        alert('Someone already connected this wallet to his/her account.');
    }
    return Promise.reject(action);
  });
};

// METAMASK LOGIN FLOW (3/4)
// Sign message to create signature
const getSignedMsg: (
  dispatch: AppDispatch,
  publicAddress: string,
  nonce: number
) => Promise<any> = async (
  dispatch: AppDispatch,
  publicAddress: string,
  nonce: number
) => {
  if (!window.ethereum) {
    return handleMetaMaskLoginFail();
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

// METAMASK LOGIN FLOW (4/4)
// Send signature to backend for verification
const tryConnection = async (
  dispatch: AppDispatch,
  publicAddress: string,
  signedMsg: string
) => {
  return dispatch(
    AuthRequiredAxios({
      method: 'POST',
      url: '/user/connect/metamask/verify',
      data: {
        metamaskWallet: publicAddress,
        signature: signedMsg,
      },
    })
  ).then((action: any) => {
    if (action.payload.status === 200) {
      return action;
    } if (action.payload.status === 409) {
      if (action.payload.data.msg === 'ERR_METAMASK_ALREADY_MY_ADDRESS')
        alert('You already connected a wallet.');
      else if (action.payload.data.msg === 'ERR_METAMASK_ALREADY_EXISTS')
        alert(
          'TRYCONNECT Someone already connected this wallet to his/her account.'
        );
    } else if (
      action.payload.status === 403 &&
      action.payload.data.msg === 'ERR_METAMASK_SIGNATURE_INVALID'
    ) {
      alert('Invalid signature.\r\nPlease try again.');
    }
    return Promise.reject(action);
  });
};

const connectToMetaMask = async (dispatch: AppDispatch) => {
  return getPublicAddress()
    .then(async (publicAddresss) => {
      const nonce = await getNonce(dispatch, publicAddresss);
      const signedMsg = await getSignedMsg(
        dispatch,
        publicAddresss,
        nonce as number
      );
      return tryConnection(dispatch, publicAddresss, signedMsg);
    })
    .catch(async (e) => e);
};

export { connectToMetaMask };
