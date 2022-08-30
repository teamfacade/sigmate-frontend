/**
 *  https://blog.logrocket.com/use-redux-next-js/
 *  https://cotak.tistory.com/164 [TaxFree:티스토리]
 */
import { configureStore, Middleware } from '@reduxjs/toolkit';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import logger from 'redux-logger';
import reducer from './modules';
import { saveState } from './modules/localStorage';

const localSyncMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  saveState(store.getState());
  return result;
};

const store: ReturnType<typeof configureStore> = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, localSyncMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});
const makeStore: MakeStore<any> = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = ReturnType<AppStore['dispatch']>;

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
});

export { store };
