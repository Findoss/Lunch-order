import type { OrderCombo } from '../../models/order/types';

export const sortCombo = (combos: OrderCombo[]): OrderCombo[] => {
  return combos.sort((v1, v2) => {
    const maxProfit1 = Math.max(...v1.combo.map((v) => v.profit));
    const maxProfit2 = Math.max(...v2.combo.map((v) => v.profit));

    return maxProfit2 - maxProfit1;
  });
};
