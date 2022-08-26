import type { Cafe, Combo, Foods } from '../../models/cafe/types';

export const textFood = (food: Foods, item: keyof Foods): string => {
  return `${food[item]}`;
};

export const textCombo = (
  food: Foods,
  combo: Combo<Foods>['combo']
): string => {
  return combo.map((item) => textFood(food, item)).join(' + ');
};

export const textMenuPrice = (
  food: Foods,
  { combo, price }: Combo<Foods>
): string => {
  return textCombo(food, combo).concat(' = ').concat(String(price));
};

export const textMenu = ({ food, menu }: Cafe): string => {
  return menu.map((combo) => textMenuPrice(food, combo)).join('\n');
};
