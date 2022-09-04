import type { Cafe } from '../../models/cafe/types';
import type { Order, OrderCombo } from '../../models/order/types';
import type { OrderAnswer } from '../../models/poll/types';

import { combine } from './combine';
import { enrichmentCombo } from './enrichment';
import { filterCombo } from './filter';
import { getCost } from '../../controllers/order/selectors';
import { maxComboEl } from './utils';

const getRawOrder = (cafe: Cafe, answers: OrderAnswer[]) => {
  const { menu } = cafe;

  return answers.map((answer) => {
    const order: Order = { ...answer, price: getCost(answer.keys, menu) ?? 0 };
    return order;
  });
};

const createOriginalOrder = (cafe: Cafe, answers: OrderAnswer[]) => {
  const orders = getRawOrder(cafe, answers).map((v) => [v]);
  return enrichmentCombo(orders, cafe);
};

const createOptimizitionOrder = (cafe: Cafe, answers: OrderAnswer[]) => {
  const { menu } = cafe;
  const max = maxComboEl(menu);
  const orders = getRawOrder(cafe, answers);
  const allCombos = [];

  for (let i = 1; i <= max; i++) {
    allCombos.push(...combine(orders, i));
  }

  const allOptimizitionCombos = enrichmentCombo(allCombos, cafe);
  const optimizitionCombos = filterCombo(allOptimizitionCombos);

  return optimizitionCombos;
};

export const createOrder = (cafe: Cafe, answers: OrderAnswer[]) => {
  return {
    originalOrder: createOriginalOrder(cafe, answers),
    optimizitionOrder: createOptimizitionOrder(cafe, answers),
  };
};
