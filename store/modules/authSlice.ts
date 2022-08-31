// https://blog.logrocket.com/use-redux-next-js/

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { setAccountState, clearAccountState } from './accountSlice';
import { AppDispatch } from '../store';

export const signIn = createAsyncThunk<
  void,
  ReduxState.AccountStateType,
  { dispatch: AppDispatch }
>('auth/signIn', async (accountInfo, ThunkAPI) => {
  ThunkAPI.dispatch(setAccountState({ ...accountInfo }));
});

export const signOut = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
  'auth/signOut',
  async (state, ThunkAPI) => {
    ThunkAPI.dispatch(clearAccountState());
  }
);

// Initial state
const initialState: ReduxState.AuthStateType = {
  signedIn: false,
  accessToken: '',
  refreshToken: '',
};

// Actual Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set the entire auth state, for initializing
    setAuthState: (state, action: PayloadAction<ReduxState.AuthStateType>) => ({
      ...action.payload,
    }),
    // Action to set tokens after signing in
    setAuthTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => ({
      ...state,
      accessToken: action.payload.accessToken,
      refreshToken: action.payload.refreshToken,
    }),
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    [signIn.fulfilled.type]: (state, action: PayloadAction<void>) => ({
      ...state,
      signedIn: true,
    }),
    [signIn.rejected.type]: (state, action: PayloadAction<void>) => ({
      ...state,
      signedIn: false,
    }),
    [signOut.fulfilled.type]: () => initialState,
  },
});

export const { setAuthState, setAuthTokens } = authSlice.actions;

export default authSlice.reducer;
