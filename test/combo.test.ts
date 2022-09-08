import type { Order } from '../src/models/order/types';

import { combine } from '../src/services/optimization/combine';
import { maxComboEl } from '../src/services/optimization/utils';

import { cafe } from './mocks/cafe/cafe';
import { orders1 } from './mocks/orders/orders';
import {
  rawCombos1,
  rawCombos2,
  rawCombos3,
  fullCombos,
} from './mocks/combos/raw-combos';

describe('Создание комбинаций', () => {
  test('комбинации из 1 элемента', () => {
    const arr = orders1;

    const result = combine(arr, 1);

    expect(result).toEqual(rawCombos1);
  });

  test('комбинации из 2 элементов', () => {
    const arr = orders1;

    const result = combine(arr, 2);

    expect(result).toEqual(rawCombos2);
  });

  test('комбинации из 3 элементов', () => {
    const arr = orders1;

    const result = combine(arr, 3);

    expect(result).toEqual(rawCombos3);
  });

  test('комбинации из максимального кол-ва элементов в комбо меню', () => {
    const arr = orders1;
    const max = maxComboEl(cafe.menu);

    const result: Order[][] = [];
    for (let i = 1; i <= max; i++) {
      result.push(...combine(arr, i));
    }

    expect(result).toEqual(fullCombos);
  });
});
