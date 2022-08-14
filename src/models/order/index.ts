import { createStore, createEvent } from 'effector';
import { persistState } from '../../services/index';

import type { LogOrder } from './types';

// events
export const storeArhiveOrder = createEvent<LogOrder>('add');

// store
export const store = createStore<LogOrder[]>([], { name: 'orders' }).on(
  storeArhiveOrder,
  (state, order: LogOrder) => [...state, order]
);

// selectors
export const selectAllOrders = () => store.getState();

// save
persistState(store);
