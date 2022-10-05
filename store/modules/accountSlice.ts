import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

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
  referredBy: '',
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
    // Action to set metamask wallet
    setMetamaskWallet: (state, action: PayloadAction<string>) => ({
      ...state,
      metamaskWallet: action.payload,
    }),
    // Action to set username
    setUserName: (state, action: PayloadAction<string>) => ({
      ...state,
      userName: action.payload,
    }),
    // Action to set display name
    setDisplayName: (state, action: PayloadAction<string>) => ({
      ...state,
      primaryProfile: {
        ...state.primaryProfile,
        displayName: action.payload,
      },
    }),
    // Action to set bio
    setBio: (state, action: PayloadAction<string>) => ({
      ...state,
      primaryProfile: {
        ...state.primaryProfile,
        bio: action.payload,
      },
    }),
    // Action to set social account publicity
    setSocialPublic: (
      state,
      action: PayloadAction<{ twitter: boolean; discord: boolean }>
    ) => ({
      ...state,
      isTwitterHandlePublic: action.payload.twitter,
      isDiscordAccountPublic: action.payload.discord,
    }),
    setAgreeTerms: (state, action: PayloadAction<string>) => ({
      ...state,
      agreeTos: action.payload,
      agreePrivacy: action.payload,
    }),
    setReferredBy: (state, action: PayloadAction<string>) => ({
      ...state,
      referredBy: action.payload,
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
  },
});

export const {
  clearAccountState,
  setAccountState,
  setMetamaskWallet,
  setUserName,
  setDisplayName,
  setBio,
  setSocialPublic,
  setAgreeTerms,
  setReferredBy,
} = accountSlice.actions;

export default accountSlice.reducer;
