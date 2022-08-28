import { combineReducers, Reducer } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import auth from './authSlice';

const reducer: Reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combineReducers({
    auth,
    // 여기에 추가
  })(state, action);
};

export default reducer;
