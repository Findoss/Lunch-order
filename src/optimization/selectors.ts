import type { Cafe, Food } from '../models/cafe/types';
import type { Order } from '../models/order/types';

import { packIdCombo, unPackIdCombo } from '../format/utils/id';
import { arraysEqual } from '../utils/array-equal';

// TODO
export const getComboInMenu = (userCombo: Food[], { menu }: Cafe) =>
  menu.find(({ combo }) => {
    return arraysEqual(combo, userCombo);
  });

export const getMenuPrice = (combo: Order[]) =>
  combo.reduce((acc, { price }) => (acc += price), 0);

export const getKey = (combo: Order[]) =>
  packIdCombo(combo.map(({ keyCombo }) => keyCombo));

export const getCost = (key: string, menu: Cafe['menu']) => {
  const userCombo = unPackIdCombo(key);

  const menuCombo =
    menu.find((combo) => {
      return arraysEqual(combo.combo, userCombo);
    })?.price ?? null;

  return menuCombo;
};

export const getProfit = (key: string, price: number, menu: Cafe['menu']) => {
  const menuCombo = getCost(key, menu);

  return price - (menuCombo ?? 0);
};

export const getProfitUser = (comboLength: number, profitCombo: number) => {
  return Math.floor(profitCombo / comboLength);
};
