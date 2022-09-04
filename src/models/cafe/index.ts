import { createStore, createEvent } from 'effector';
import { persistState } from '../../services';

import type { Cafe } from './types';

// events
export const storeSetCafe = createEvent<Cafe>('set');

// store
export const store = createStore<Cafe>(
  {
    food: { sup: 'dis', salad: 'salad', dish: 'dish' },
    menu: [],
    optimization: [],
  },
  { name: 'cafe' }
).on(storeSetCafe, (state, cafe) => cafe);

// selectors
export const selectCafe = () => store.getState();
export const selectFoodValue: () => string[] = () =>
  Object.values(store.getState().food);
export const selectFoodKeys: () => string[] = () =>
  Object.keys(store.getState().food);

// save
persistState(store);
