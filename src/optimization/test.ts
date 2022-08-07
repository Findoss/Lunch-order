import { optimaze } from './index';
import { Cafe } from '../models/cafe/types';
import { Order } from '../models/order/types';

const cafe = {
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
} as Cafe;

const order1 = {
  idPoll: 5440775982577354000,
  order: [
    {
      name: 'Никита Строганов',
      username: 'findoss',
      options: ['salad'],
    },
    {
      name: 'XXXASA',
      username: 'findoss',
      options: ['sup'],
    },
  ],
  date: 1659887655494,
} as Order;

describe('optimization', () => {
  test('not optimaze', () => {
    const result = optimaze(cafe, order1);

    expect(result).toEqual('');
  });

  test('sup + salad', () => {
    const result = optimaze(cafe, order1);

    expect(result).toEqual('');
  });

  test('sup + salad + dish', () => {
    const result = optimaze(cafe, order1);

    expect(result).toEqual('');
  });
});
