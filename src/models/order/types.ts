import { Answer } from '../poll/types';

export type Order = {
  idPoll: number;
  users: Answer[];
  date: number; // timestamp
};
