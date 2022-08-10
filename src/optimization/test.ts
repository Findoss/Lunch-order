import { optimization, findOptimalCombo } from './index';

import { cafe, order1 } from './mocks';

describe('optimization', () => {
  test('findOptimalCombo', () => {
    const result = findOptimalCombo(cafe);
    console.log(result);

    // expect(result).toEqual('');
  });

  // test('sup + salad', () => {
  //   const result = optimaze(cafe, order1);

  //   expect(result).toEqual('');
  // });

  // test('sup + salad + dish', () => {
  //   const result = optimaze(cafe, order1);

  //   expect(result).toEqual('');
  // });
});
