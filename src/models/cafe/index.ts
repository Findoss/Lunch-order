import { createStore, createEvent } from 'effector';
import { persist } from 'effector-storage';
import { adapter } from '../../services/index';

import type { Cafe } from './types';

// events
export const storeSetCafe = createEvent<Cafe>('set');

// store
export const store = createStore<Cafe>(
  { food: { sup: 'sup' }, menu: [], optimization: [] },
  { name: 'cafe' }
).on(storeSetCafe, (state, cafe: Cafe) => cafe);

// selectors
export const selectCafe = () => store.getState();

// save
persist({ store, adapter });

// watch
// store.watch(console.log);
