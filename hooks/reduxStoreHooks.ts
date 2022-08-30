import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { AppState, AppDispatch } from 'store/store';
import { store } from 'store/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export function useTokenAuth() {
  return {
    headers: {
      Authorization: `Bearer ${
        (store.getState() as AppState).auth.accessToken
      }`,
    },
  };
}
