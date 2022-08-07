import { textFood } from './text-food';
import { packIdCombo, unPackIdCombo } from './utils/id';
import { arraysEqual } from './utils/array-equal';

import type { Cafe, Combo, Foods, Food } from '../models/cafe/types';
import type { Order } from '../models/order/types';
import { Answer } from '../models/poll/types';

export const textCombo = (food: Foods, combo: Food[]): string => {
  return combo.map((item) => textFood(food, item)).join(' + ');
};

export const textComboPrice = (
  food: Foods,
  { combo, price }: Combo<Foods>
): string => {
  return textCombo(food, combo).concat(' = ').concat(String(price));
};

export const textAllOrderCombo = ({ food }: Cafe, { users }: Order) => {
  const combos: Record<string, number> = {};

  users.forEach((user) => {
    const combo = user.options;
    const id = packIdCombo(combo);

    if (Object.prototype.hasOwnProperty.call(combos, id)) {
      combos[id] += 1;
    } else {
      combos[id] = 1;
    }
  });

  return Object.entries(combos)
    .map(([id, count]) => {
      const combo = textCombo(food, unPackIdCombo(id));
      return `${combo} x${count}`;
    })
    .join('\n');
};

export const textUserOrderCombo = ({ food }: Cafe, { users }: Order) => {
  return users
    .map((user) => {
      return `${user.name} = ${textCombo(food, user.options)}`;
    })
    .join('\n');
};

const getPrice = (menu: Cafe['menu'], user: Answer) => {
  if (menu === undefined) return 0;

  const combo = menu.find((combo) => {
    return arraysEqual(combo.combo, user.options);
  });

  if (combo === undefined) return 0;

  return combo.price;
};

export const textUserOrderPrice = ({ menu }: Cafe, { users }: Order) => {
  return users
    .map((user) => `${user.name} = ${getPrice(menu, user)} ₽`)
    .join('\n');
};
