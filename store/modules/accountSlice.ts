import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import Axios from 'lib/global/axiosInstance';
import { useTokenAuth } from 'hooks/reduxStoreHooks';
import { AppDispatch } from '../store';

// Initial state
export const initialState: ReduxState.AccountStateType = {
  id: -1,
  userName: null,
  userNameUpdatedAt: null,
  email: '',
  metamaskWallet: null,
  isMetamaskWalletPublic: false,
  googleAccount: null,
  twitterHandle: null,
  isTwitterHandlePublic: false,
  discordAccount: null,
  isDiscordAccountPublic: false,
  isTester: false,
  isAdmin: false,
  locale: null,
  theme: null,
  emailEssential: false, // 이메일 수신동의
  emailMarketing: false,
  cookiesEssential: false, // 쿠키 방침 동의
  cookiesAnalytics: false,
  cookiesFunctional: false,
  cookiesTargeting: false,
  agreeTos: null, // 동의한 날짜
  agreePrivacy: null,
  agreeLegal: null,
  referralCode: '',
  group: {
    // 유저 권한
    id: -1,
    groupName: '',
    canCreateDocument: false,
    canRequestDocumentEdit: false,
    canEditDocument: false,
    canVerify: false,
    canReceivePoints: false,
    canParticipateEvent: false,
  },
  primaryProfile: {
    id: -1,
    displayName: null,
    bio: null,
    profileImageUrl:
      'https://lh3.googleusercontent.com/c5dqxl-2uHZ82ah9p7yxrVF1ZssrJNSV_15Nu0TUZwzCWqmtoLxCUJgEzLGtxsrJ6-v6R6rKU_-FYm881TTiMCJ_=s1600',
    userId: -1,
  },
};

const setDisplayName = createAsyncThunk<
  string,
  string,
  { dispatch: AppDispatch }
>('account/setDisplayName', async (newDisplayName) => {
  await Axios.patch(
    '/profile',
    { displayName: newDisplayName },
    useTokenAuth()
  );
  return newDisplayName;
});

const setBio = createAsyncThunk<string, string, { dispatch: AppDispatch }>(
  'account/setBio',
  async (newBio) => {
    await Axios.patch('/profile', { bio: newBio }, useTokenAuth());
    return newBio;
  }
);

const setSocialPublic = createAsyncThunk<
  { twitter: boolean; discord: boolean },
  { twitter: boolean; discord: boolean },
  { dispatch: AppDispatch }
>('account/setSocialPublic', async ({ twitter, discord }) => {
  await Axios.patch(
    '/user',
    { isTwitterHandlePublic: twitter, isDiscordAccountPublic: discord },
    useTokenAuth()
  );
  return { twitter, discord };
});

// Actual Slice
export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    // Action to clear account state
    clearAccountState: () => initialState,
    // Action to set the entire account state, for initializing
    setAccountState: (
      state,
      action: PayloadAction<ReduxState.AccountStateType>
    ) => ({
      ...action.payload,
    }),
    // Action to set username
    setUserName: (state, action: PayloadAction<string>) => ({
      ...state,
      userName: action.payload,
    }),
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.account,
      };
    },
    [setDisplayName.fulfilled.type]: (
      state,
      action: PayloadAction<string>
    ) => ({
      ...state,
      primaryProfile: {
        ...state.primaryProfile,
        displayName: action.payload,
      },
    }),
    [setBio.fulfilled.type]: (state, action: PayloadAction<string>) => ({
      ...state,
      primaryProfile: {
        ...state.primaryProfile,
        bio: action.payload,
      },
    }),
    [setSocialPublic.fulfilled.type]: (
      state,
      action: PayloadAction<{ twitter: boolean; discord: boolean }>
    ) => ({
      ...state,
      isTwitterHandlePublic: action.payload.twitter,
      isDiscordAccountPublic: action.payload.discord,
    }),
  },
});

export const { clearAccountState, setAccountState, setUserName } =
  accountSlice.actions;

export { setDisplayName, setBio, setSocialPublic };

export default accountSlice.reducer;
