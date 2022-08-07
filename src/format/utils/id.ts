import { Food } from '../../models/cafe/types';

export const packIdCombo = (arr: Food[]) => {
  return arr.join('_');
};

export const unPackIdCombo = (str: string): Food[] => {
  return str.split('_') as Food[];
};