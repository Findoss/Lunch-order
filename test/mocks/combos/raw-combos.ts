import type { Order } from '../../../src/models/order/types';

export const rawCombos1: Order[][] = [
  [{ name: 'Вася', username: 'vasa', keys: ['dish'], price: 200 }],
  [{ name: 'Алена', username: 'alena', keys: ['sup'], price: 130 }],
  [{ name: 'Рома', username: 'roma', keys: ['sup'], price: 130 }],
];

export const rawCombos2: Order[][] = [
  [
    { name: 'Вася', username: 'vasa', keys: ['dish'], price: 200 },
    { name: 'Алена', username: 'alena', keys: ['sup'], price: 130 },
  ],
  [
    { name: 'Вася', username: 'vasa', keys: ['dish'], price: 200 },
    { name: 'Рома', username: 'roma', keys: ['sup'], price: 130 },
  ],
  [
    { name: 'Алена', username: 'alena', keys: ['sup'], price: 130 },
    { name: 'Рома', username: 'roma', keys: ['sup'], price: 130 },
  ],
];

export const rawCombos3: Order[][] = [
  [
    { name: 'Вася', username: 'vasa', keys: ['dish'], price: 200 },
    { name: 'Алена', username: 'alena', keys: ['sup'], price: 130 },
    { name: 'Рома', username: 'roma', keys: ['sup'], price: 130 },
  ],
];

export const fullCombos: Order[][] = [
  ...rawCombos1,
  ...rawCombos2,
  ...rawCombos3,
];
