import { Answer } from '../poll/types';

export type Order = {
  idPoll: number;
  order: Answer[];
  date: number; // timestamp
};
