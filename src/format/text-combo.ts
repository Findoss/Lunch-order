import { textFood } from './text-food';

import type { Combo, Foods } from '../models/cafe/types';

export const textCombo = (
  food: Foods,
  combo: Combo<Foods>['combo']
): string => {
  return combo.map((item) => textFood(food, item)).join(' + ');
};

export const textComboPrice = (
  food: Foods,
  { combo, price }: Combo<Foods>
): string => {
  return textCombo(food, combo).concat(' = ').concat(String(price));
};
