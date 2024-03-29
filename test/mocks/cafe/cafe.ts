import type { Cafe } from '../../../src/models/cafe/types';

export const cafe: Cafe = {
  food: {
    salad: 'Салат',
    sup: 'Суп',
    dish: 'Горячее',
  },
  menu: [
    {
      combo: ['salad'],
      price: 130,
    },
    {
      combo: ['sup'],
      price: 130,
    },
    {
      combo: ['dish'],
      price: 200,
    },
    {
      combo: ['salad', 'sup'],
      price: 250,
    },
    {
      combo: ['salad', 'dish'],
      price: 280,
    },
    {
      combo: ['sup', 'dish'],
      price: 280,
    },
    {
      combo: ['salad', 'sup', 'dish'],
      price: 350,
    },
  ],
  optimization: [],
};
