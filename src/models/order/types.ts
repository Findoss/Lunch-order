import type { Food } from '../cafe/types';
import type { OrderAnswer } from '../poll/types';
import type { UserName } from '../types';

export type LogOrder = {
  idPoll: number;
  order: OrderAnswer[];
  date: number; // timestamp
};

export type Order = {
  name: UserName;
  username: UserName;
  keys: Food[];
  price: number;
  profit?: number;
  cost?: number;
};

export type OrderCombo = {
  combo: Order[];
  keys: Food[];
  price: number;
  profit: number;
  cost: number;
};
