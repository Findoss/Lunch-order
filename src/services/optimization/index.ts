import type { Cafe } from '../../models/cafe/types';
import type { Order } from '../../models/order/types';
import type { OrderAnswer } from '../../models/poll/types';

import { combine } from './combine';
import { enrichmentCombo } from './enrichment';
import { filterCombo } from './filter';
import { getCost } from './selectors';
import { sortCombo } from './sort';
import { maxComboEl } from './utils';

const getRawOrder = (cafe: Cafe, answers: OrderAnswer[]) => {
  const { menu } = cafe;

  return answers.map((answer) => {
    const order: Order = {
      ...answer,
      price: getCost(answer.keys, menu) ?? 0,
      profit: 0,
      cost: 0,
    };
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
  const sortedOptimizitionCombos = sortCombo(allOptimizitionCombos);
  const optimizitionCombos = filterCombo(sortedOptimizitionCombos);

  return optimizitionCombos;
};

export const createOrder = (cafe: Cafe, answers: OrderAnswer[]) => {
  return {
    originalOrder: createOriginalOrder(cafe, answers),
    optimizitionOrder: createOptimizitionOrder(cafe, answers),
  };
};
