import { Food } from '../cafe/types';
import { UserName } from '../types';

export type Answer = {
  name: string;
  username: UserName;
  options: Food[];
};
