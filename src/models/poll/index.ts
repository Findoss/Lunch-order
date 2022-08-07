import { createStore, createEvent } from 'effector';
import { persist } from 'effector-storage';
import { adapter } from '../../services/index';

// events
export const storeSetPollTimeLimit = createEvent<number>('setTimeLimit');

// store
export const store = createStore<number>(300, { name: 'pollTimeLimit' }).on(
  storeSetPollTimeLimit,
  (state, seconds: number) => seconds
);

// selectors
export const selectPollTimeLimit = () => store.getState();

// save
persist({ store, adapter });

// watch
// store.watch(console.log);
