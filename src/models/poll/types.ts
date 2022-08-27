import type { Food } from '../cafe/types';
import type { UserName } from '../types';

export type OrderAnswer = {
  name: string;
  username: UserName;
  keys: Food[];
};
