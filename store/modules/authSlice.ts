// https://blog.logrocket.com/use-redux-next-js/

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import Axios, { RenewAccessToken } from 'lib/global/axiosInstance';
import { useTokenAuth } from 'hooks/reduxStoreHooks';
import { deleteState } from './localStorage';
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
    deleteState();
    ThunkAPI.dispatch(clearAccountState());
  }
);

/**
 *  @redux-thunk
 *  Check login status, then sends https request to server using axios.
 *  Always returns {status: number, data: object}.
 */
export const AuthRequiredAxios = createAsyncThunk<
  Promise<any>,
  { method: string; url: string; data?: any; retryCount?: number },
  { dispatch: AppDispatch; state: ReduxState.RootStateType }
>('auth/axios', async ({ method, url, data, retryCount = 0 }, ThunkAPI) => {
  if (retryCount > 1) {
    return {
      status: 500,
      data: {
        msg: 'Unexpected error occurred.\r\nPlease report this bug to out dev team.',
      },
    };
  }

  const config = useTokenAuth(ThunkAPI.getState().auth.accessToken);
  let response: any = { status: 200 };
  try {
    switch (method) {
      case 'GET':
        response = await Axios.get(url, config);
        break;
      case 'POST':
        response = await Axios.post(url, data, config);
        break;
      case 'PATCH':
        response = await Axios.patch(url, data, config);
        break;
      case 'DELETE':
        response = await Axios.delete(url, config);
        break;
      case 'PUT':
        response = await Axios.put(url, data, config);
        break;
      default:
        break;
    }
    return {
      status: response.status,
      data: response.data,
    };
  } catch (e: any) {
    if (e.response.status === 401) {
      try {
        const { result, accessToken } = await RenewAccessToken(
          ThunkAPI.getState().auth.refreshToken,
          config
        );

        if (result === 'SignOutNeeded') {
          alert('Session was expired. You need to sign in again.');
          ThunkAPI.dispatch(signOut());
          return {
            status: 200,
            data: e.response.data,
          };
        }
        if (result === 'Success' && accessToken) {
          await ThunkAPI.dispatch(setAccessToken({ accessToken }));
          const action: any = await ThunkAPI.dispatch(
            AuthRequiredAxios({ method, url, data, retryCount: retryCount + 1 })
          );
          return {
            status: action.payload.status,
            data: action.payload.data,
          };
        }
      } catch (err: any) {
        return {
          status: err.status,
          data: e.data,
        };
      }
    }
    return {
      status: e.response.status,
      data: e.response.data,
    };
  }
});

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
    // Action to set tokens after signing in
    setAccessToken: (
      state,
      action: PayloadAction<{ accessToken: string }>
    ) => ({
      ...state,
      accessToken: action.payload.accessToken,
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
    [signIn.fulfilled.type]: (state) => ({
      ...state,
      signedIn: true,
    }),
    [signIn.rejected.type]: (state) => ({
      ...state,
      signedIn: false,
    }),
    [signOut.fulfilled.type]: () => initialState,
  },
});

export const { setAuthTokens, setAccessToken } = authSlice.actions;

export default authSlice.reducer;
