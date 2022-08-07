import { Cafe } from '../models/cafe/types';
import { Order } from '../models/order/types';

export const optimaze = (cafe: Cafe, order: Order) => {
  return '11211';
};

const opt = {
  idPoll: 5440775982577354000,
  users: [
    {
      name: 'Никита Строганов',
      username: 'findoss',
      options: ['salad'],
    },
    {
      name: 'XXXASA',
      username: 'awwwwww',
      options: ['sup'],
    },
  ],
  optimaze: [
    {
      users: [
        {
          name: 'Никита Строганов',
          username: 'findoss',
          price: 100,
        },
        {
          name: 'XXXASA',
          username: 'awwwwww',
          price: 520,
        },
      ],
      combo: [['sup'], ['salad']],
    },
  ],
  date: 1659887655494,
};

// найти комбо
// перенести в оптимизацию
// перенести остатки
// переписать вывод под оптимизацию
