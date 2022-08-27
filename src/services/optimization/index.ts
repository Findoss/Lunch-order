import type { Cafe } from '../../models/cafe/types';
import type { Order } from '../../models/order/types';
import type { OrderAnswer } from '../../models/poll/types';

import { combine } from './combine';
import { enrichmentCombo } from './enrichment';
import { filterCombo } from './filter';
import { getCost } from '../../controllers/order/selectors';
import { maxComboEl } from './utils';

export const createOrder = (cafe: Cafe, answers: OrderAnswer[]) => {
  const { menu } = cafe;
  const max = maxComboEl(menu);

  const orders = answers.map((answer) => {
    const order: Order = { ...answer, price: getCost(answer.keys, menu) ?? 0 };
    return order;
  });

  const originalCombos = [orders];
  const originalOrder = enrichmentCombo(originalCombos, cafe);

  const optimizitionCombos = [];
  for (let i = 1; i <= max; i++) {
    optimizitionCombos.push(...combine(orders, i));
  }
  const optimizitionOrder = enrichmentCombo(optimizitionCombos, cafe);

  return { originalOrder, optimizitionOrder };
};
