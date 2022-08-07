import { textComboPrice } from './text-combo';

import type { Cafe } from '../models/cafe/types';

export const textMenu = ({ food, menu }: Cafe): string => {
  return menu.map((combo) => textComboPrice(food, combo)).join('\n');
};
