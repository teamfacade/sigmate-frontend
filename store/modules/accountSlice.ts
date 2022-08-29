import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Initial state
export const initialState: ReduxState.AccountStateType = {
  PFPUrl: '',
  username: 'Sign In',
  displayName: '',
};

// Actual Slice
export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    // Action to clear account state
    clearAccountState: (state, action: PayloadAction<void>) => initialState,
    // Action to set the entire account state, for initializing
    setAccountState: (
      state,
      action: PayloadAction<ReduxState.AccountStateType>
    ) => ({
      ...action.payload,
    }),
    // Action to set username
    setUsername: (state, action: PayloadAction<string>) => ({
      ...state,
      account: {
        username: action.payload,
      },
    }),
    // Action to set username
    setDisplayName: (state, action: PayloadAction<string>) => ({
      ...state,
      account: {
        displayName: action.payload,
      },
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
  setUsername,
  setDisplayName,
} = accountSlice.actions;

export default accountSlice.reducer;
