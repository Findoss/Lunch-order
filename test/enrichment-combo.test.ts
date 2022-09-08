import { enrichmentCombo } from '../src/services/optimization/enrichment';

import { cafe } from './mocks/cafe/cafe';
import { rawCombos1 } from './mocks/combos/raw-combos';
import { enrichmentCombo1 } from './mocks/combos/enrichment-combo';

describe('optimization', () => {
  test('enrichmentCombo', () => {
    const arr = rawCombos1;
    const menu = cafe;

    const result = enrichmentCombo(arr, menu);

    expect(result).toEqual(enrichmentCombo1);
  });
});
