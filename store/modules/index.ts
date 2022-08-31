import { combineReducers, createAction, Reducer } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import auth from './authSlice';
import account from './accountSlice';

export const setRootState =
  createAction<ReduxState.RootStateType>('setRootState');

const reducer: Reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  } if (action.type === 'setRootState') {
    return {
      ...action.payload,
    };
  }
  return combineReducers({
    auth,
    account,
    // 여기에 추가
  })(state, action);
};

export default reducer;
