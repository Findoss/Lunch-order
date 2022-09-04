import { combine } from '../src/services/optimization/combine';
import { enrichmentCombo } from '../src/services/optimization/enrichment';
import { maxComboEl } from '../src/services/optimization/utils';

import { cafe } from './mocks/cafe';
import { orders1 } from './mocks/orders';
import { rawCombos1, fullCombos1 } from './mocks/combos';
import { getUserFood } from '../src/services/optimization/selectors';
import {
  textComboOriginalOrder,
  textUserFood,
  textUserOrderCost,
  textComboOptimazeOrder,
  textReportOrder,
  textOrder,
} from '../src/services/optimization/text';
import { a6 } from './mocks/answers';
import { createOrder } from '../src/services/optimization';

describe('optimization', () => {
  test('combine', () => {
    // const arr = orders1;
    // const max = maxComboEl(cafe.menu);
    // const result = [];
    // for (let i = 1; i <= max; i++) {
    //   result.push(...combine(arr, i));
    // }
    // expect(result).toEqual(rawCombos1);
  });

  test('enrichmentCombo', () => {
    // const arr = rawCombos1;
    // const menu = cafe;
    // const result = enrichmentCombo(arr, menu);
    // expect(result).toEqual(fullCombos1);
  });

  test('enrichmentCombo rawOrder', () => {
    // const arr = orders1.map((v) => [v]);
    // const menu = cafe;
    // const result = enrichmentCombo(arr, menu);
    // console.log(JSON.stringify(result, null, 2));
    // expect(result).toEqual(filteredCombos1);
  });

  test('text', () => {
    // const arr = fullCombos1;
    // const result4 = textReportOrder(arr, cafe);
    // console.log(JSON.stringify(result4, null, 2));
    // expect(result).toEqual(filteredCombos1);
  });

  test('Оптимизация заказов (3 взяли разное)', () => {
    const { optimizitionOrder, originalOrder } = createOrder(cafe, a6);
    const result1 = textOrder(originalOrder, cafe);
    const result2 = textReportOrder(optimizitionOrder, cafe);
    console.log(result1);
    console.log(result2);
    // expect(result).toEqual(filteredCombos1);
  });
});
