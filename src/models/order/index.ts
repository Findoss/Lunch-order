import type { OrderLog } from './types';

import { createStore, createEvent } from 'effector';
import { persistState } from '../../services/index';

// events
export const storeArhiveOrder = createEvent<OrderLog>('arhiveOrder');

// store
export const store = createStore<OrderLog[]>([], { name: 'orders' }).on(
  storeArhiveOrder,
  (state, payload: OrderLog) => [...state, payload]
);

// selectors
export const selectAllOrders = () => store.getState();

// save
persistState(store);
