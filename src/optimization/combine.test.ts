import { combine } from './combine';

describe('combine', () => {
  test('depth 1', () => {
    const arr = ['a', 'b', 'c'];

    const result = combine(arr, 1);

    expect(result).toEqual([['a'], ['b'], ['c']]);
  });

  test('depth 2', () => {
    const arr = ['a', 'b', 'c'];

    const result = combine(arr, 2);

    expect(result).toEqual([
      ['a', 'b'],
      ['a', 'c'],
      ['b', 'c'],
    ]);
  });

  test('depth 3', () => {
    const arr = ['a', 'b', 'c'];

    const result = combine(arr, 3);

    expect(result).toEqual([['a', 'b', 'c']]);
  });
});
