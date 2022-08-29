/**
 *  https://blog.logrocket.com/use-redux-next-js/
 *  https://cotak.tistory.com/164 [TaxFree:티스토리]
 */
import {
  configureStore,
  ThunkAction,
  Action,
  Middleware,
} from '@reduxjs/toolkit';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import logger from 'redux-logger';
import reducer from './modules';
import { saveState } from './modules/localStorage';

const localSyncMiddleware: Middleware = (store) => (next) => (action) => {
  saveState(store.getState());
  return next(action);
};

const makeStore: MakeStore<any> = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(localSyncMiddleware, logger),
    devTools: process.env.NODE_ENV !== 'production',
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = ReturnType<AppStore['dispatch']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
});
