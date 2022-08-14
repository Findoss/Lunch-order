import type { OrderCombo, Order } from '../../models/order/types';

export const rawCombos1: Order[][] = [
  [
    {
      name: 'Вася',
      username: 'vasa',
      userCombo: ['dish'],
      keyCombo: 'dish',
      price: 200,
    },
  ],
  [
    {
      name: 'Алена',
      username: 'alena',
      userCombo: ['sup'],
      keyCombo: 'sup',
      price: 130,
    },
  ],
  [
    {
      name: 'Рома',
      username: 'roma',
      userCombo: ['sup'],
      keyCombo: 'sup',
      price: 130,
    },
  ],
  [
    {
      name: 'Вася',
      username: 'vasa',
      userCombo: ['dish'],
      keyCombo: 'dish',
      price: 200,
    },
    {
      name: 'Алена',
      username: 'alena',
      userCombo: ['sup'],
      keyCombo: 'sup',
      price: 130,
    },
  ],
  [
    {
      name: 'Вася',
      username: 'vasa',
      userCombo: ['dish'],
      keyCombo: 'dish',
      price: 200,
    },
    {
      name: 'Рома',
      username: 'roma',
      userCombo: ['sup'],
      keyCombo: 'sup',
      price: 130,
    },
  ],
  [
    {
      name: 'Алена',
      username: 'alena',
      userCombo: ['sup'],
      keyCombo: 'sup',
      price: 130,
    },
    {
      name: 'Рома',
      username: 'roma',
      userCombo: ['sup'],
      keyCombo: 'sup',
      price: 130,
    },
  ],
  [
    {
      name: 'Вася',
      username: 'vasa',
      userCombo: ['dish'],
      keyCombo: 'dish',
      price: 200,
    },
    {
      name: 'Алена',
      username: 'alena',
      userCombo: ['sup'],
      keyCombo: 'sup',
      price: 130,
    },
    {
      name: 'Рома',
      username: 'roma',
      userCombo: ['sup'],
      keyCombo: 'sup',
      price: 130,
    },
  ],
];

export const fullCombos1: OrderCombo[] = [
  {
    key: 'dish_sup',
    combo: [
      {
        name: 'Вася',
        username: 'vasa',
        userCombo: ['dish'],
        keyCombo: 'dish',
        price: 200,
        profit: 25,
        cost: 175,
      },
      {
        name: 'Алена',
        username: 'alena',
        userCombo: ['sup'],
        keyCombo: 'sup',
        price: 130,
        profit: 25,
        cost: 105,
      },
    ],
    profit: 50,
    price: 330,
    cost: 280,
  },
  {
    key: 'dish_sup',
    combo: [
      {
        name: 'Вася',
        username: 'vasa',
        userCombo: ['dish'],
        keyCombo: 'dish',
        price: 200,
        profit: 25,
        cost: 175,
      },
      {
        name: 'Рома',
        username: 'roma',
        userCombo: ['sup'],
        keyCombo: 'sup',
        price: 130,
        profit: 25,
        cost: 105,
      },
    ],
    profit: 50,
    price: 330,
    cost: 280,
  },
  {
    key: 'dish',
    combo: [
      {
        name: 'Вася',
        username: 'vasa',
        userCombo: ['dish'],
        keyCombo: 'dish',
        price: 200,
        profit: 0,
        cost: 200,
      },
    ],
    profit: 0,
    price: 200,
    cost: 200,
  },
  {
    key: 'sup',
    combo: [
      {
        name: 'Алена',
        username: 'alena',
        userCombo: ['sup'],
        keyCombo: 'sup',
        price: 130,
        profit: 0,
        cost: 130,
      },
    ],
    profit: 0,
    price: 130,
    cost: 130,
  },
  {
    key: 'sup',
    combo: [
      {
        name: 'Рома',
        username: 'roma',
        userCombo: ['sup'],
        keyCombo: 'sup',
        price: 130,
        profit: 0,
        cost: 130,
      },
    ],
    profit: 0,
    price: 130,
    cost: 130,
  },
];
