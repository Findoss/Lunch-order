import { createStore, createEvent } from 'effector';
import { persist } from 'effector-storage';
import { adapter } from '../../services/index';

import type { UserName } from '../types';

// events
export const storeAddAdmin = createEvent<UserName>('add');
export const storeRemoveAdmin = createEvent<UserName>('remove');
export const storeResetAdmin = createEvent('reset');

// store
export const store = createStore<UserName[]>([], { name: 'admins' })
  .on(storeAddAdmin, (state, userName: UserName) => {
    if (!state.includes(userName)) {
      return [...state, userName];
    }
  })
  .on(storeRemoveAdmin, (state, userName: UserName) =>
    state.filter((adminName) => adminName !== userName)
  )
  .reset(storeResetAdmin);

// selectors
export const selectAdminList = () =>
  store
    .getState()
    .map((userName) => `@${userName}`)
    .join(', ');

export const selectHasAdmin = (userName: UserName) =>
  store.getState().includes(userName);

// save
persist({ store, adapter });

// watch
// store.watch(console.log);
