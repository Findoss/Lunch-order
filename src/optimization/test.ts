import { combine } from './combine';
import { enrichmentCombo } from './enrichment-combine';
import { maxComboEl } from './utils';

import { cafe } from './mocks/cafe';
import { orders1 } from './mocks/orders';
import { rawCombos1, fullCombos1 } from './mocks/combos';

describe('optimization', () => {
  test('combine', () => {
    const arr = orders1;
    const max = maxComboEl(cafe.menu);

    const result = [];
    for (let i = 1; i <= max; i++) {
      result.push(...combine(arr, i));
    }

    expect(result).toEqual(rawCombos1);
  });

  test('enrichmentCombo', () => {
    const arr = rawCombos1;
    const menu = cafe;

    const result = enrichmentCombo(arr, menu);

    expect(result).toEqual(fullCombos1);
  });

  test('enrichmentCombo rawOrder', () => {
    const arr = orders1.map((v) => [v]);
    const menu = cafe;

    const result = enrichmentCombo(arr, menu);
    console.log(JSON.stringify(result, null, 2));

    // expect(result).toEqual(filteredCombos1);
  });
});
