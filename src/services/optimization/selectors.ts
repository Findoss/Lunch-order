import type { Cafe, Food } from '../../models/cafe/types';
import type { Order, OrderCombo } from '../../models/order/types';

import { arraysEqual } from '../../utils/array-equal';
import { floor5 } from '../../utils/number';

export const getComboInMenu = (keys: Food[], menu: Cafe['menu']) =>
  menu.find(({ combo }) => {
    return arraysEqual(combo, keys);
  });

export const getMenuPrice = (combo: Order[]) =>
  combo.reduce((acc, { price }) => (acc += price), 0);

export const getKey = (combo: Order[]) => combo.map((v) => v.keys).flat(1);

export const getCost = (keys: Food[], menu: Cafe['menu']) => {
  return getComboInMenu(keys, menu)?.price ?? null;
};

export const getProfit = (keys: Food[], price: number, menu: Cafe['menu']) => {
  const menuCombo = getCost(keys, menu);
  return price - (menuCombo ?? 0);
};

export const getProfitUser = (countUser: number, profitCombo: number) => {
  return floor5(profitCombo / countUser);
};

export const getOnlyUserCombo = (combos: OrderCombo[]) => {
  return combos.map((combo) => combo.combo).flat(1);
};
