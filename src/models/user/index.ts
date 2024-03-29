import { createStore, createEvent } from 'effector';

import { persistState } from '../../services/index';

import type { User } from './types';

// events
export const storeSetUsers = createEvent<User[]>('set');
export const storeResetUsers = createEvent('reset');

// store
export const store = createStore<User[]>([], { name: 'users' })
  .on(storeSetUsers, (state, users: User[]) => users)
  .reset(storeResetUsers);

// selectors
export const selectAllUsers = () => store.getState();

// save
persistState(store);
