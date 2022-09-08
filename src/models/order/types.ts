import type { Food } from '../cafe/types';
import type { UserName } from '../types';

export type Order = {
  name: UserName;
  username: UserName;
  keys: Food[];
  price: number;
  profit: number;
  cost: number;
};

export type OrderLog = {
  idPoll: number;
  order: OrderCombo[];
  date: number; // timestamp
};

export type OrderCombo = {
  combo: Order[];
  keys: Food[];
  price: number;
  profit: number;
  cost: number;
};
