import type { Order } from '../models/order/types';
import type { Cafe } from '../models/cafe/types';

import {
  getKey,
  getCost,
  getMenuPrice,
  getProfit,
  getProfitUser,
} from './selectors';

export const enrichmentCombo = (combos: Order[][], { menu }: Cafe) => {
  return combos
    .map((combo) => {
      const comboLength = combo.length;
      const key = getKey(combo);
      const cost = getCost(key, menu);
      const priceCombo = getMenuPrice(combo);
      const profitCombo = getProfit(key, priceCombo, menu);
      const profitUser = getProfitUser(comboLength, profitCombo);

      return {
        key,
        combo: combo.map((userCombo) => ({
          ...userCombo,
          profit: profitUser,
          cost: userCombo.price - profitUser,
        })),
        profit: profitCombo,
        price: priceCombo,
        cost: cost,
      };
    })
    .filter((v) => v.cost !== null)
    .sort((a, b) => b.profit - a.profit);
};
