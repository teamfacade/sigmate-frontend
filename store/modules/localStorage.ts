import { AppState } from '../store';

// https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
export const loadState = (stateName?: string) => {
  // localStorage access can fail
  try {
    const serializedState = localStorage.getItem('state');

    if (serializedState === null || serializedState === 'undefined') {
      return undefined;
    }
    if (stateName) {
      return JSON.parse(serializedState)[stateName];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error(`error occurred while fetching: ${err}`);
    return undefined;
  }
};

export const saveState = (state: AppState) => {
  // localStorage access can fail
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (err) {
    console.error(err);
  }
};
