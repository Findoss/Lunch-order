import { Food } from '../cafe/types';
import { UserName } from '../types';

export type OrderAnswer = {
  name: string;
  username: UserName;
  options: Food[];
};
