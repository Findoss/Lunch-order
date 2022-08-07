import { createStore, createEvent } from 'effector';
import { persistState } from '../../services/index';

import type { Order } from './types';

// events
export const storeArhiveOrder = createEvent<Order>('add');

// store
export const store = createStore<Order[]>([], { name: 'orders' }).on(
  storeArhiveOrder,
  (state, order: Order) => [...state, order]
);

// selectors
export const selectAllOrders = () => store.getState();

// save
persistState(store);
