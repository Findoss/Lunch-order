import type { Order, OrderCombo } from '../../models/order/types';
import type { Cafe } from '../../models/cafe/types';

import {
  getKey,
  getCost,
  getMenuPrice,
  getProfit,
  getProfitUser,
} from './selectors';

export const enrichmentCombo = (
  combos: Order[][],
  { menu }: Cafe
): OrderCombo[] => {
  return combos
    .map((combo) => {
      const countUser = combo.length;
      const keys = getKey(combo);
      const cost = getCost(keys, menu);
      const priceCombo = getMenuPrice(combo);
      const profitCombo = getProfit(keys, priceCombo, menu);
      const profitUser = getProfitUser(countUser, profitCombo);

      return {
        keys,
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
    .sort((v1, v2) => {
      const maxProfit1 = Math.max(...v1.combo.map((v) => v.profit));
      const maxProfit2 = Math.max(...v2.combo.map((v) => v.profit));

      return maxProfit2 - maxProfit1;
    }) as OrderCombo[];
};
