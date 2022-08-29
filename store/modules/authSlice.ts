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
export const initialState: ReduxState.AuthStateType = {
  signedIn: false,
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
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...action.payload,
      };
    },
    [signIn.fulfilled.type]: (state, action: PayloadAction<void>) => ({
      signedIn: true,
    }),
    [signIn.rejected.type]: (state, action: PayloadAction<void>) => ({
      signedIn: false,
    }),
    [signOut.fulfilled.type]: (state, action: PayloadAction<void>) =>
      initialState,
  },
});

export const { setAuthState } = authSlice.actions;

export default authSlice.reducer;
