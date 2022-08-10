import {
  filterCombinationsLength,
  filterCombinationsUniq,
} from './filter-combine';

describe('filter combine', () => {
  test('length 2, 3', () => {
    const arr = [
      ['a'],
      ['b', 'v'],
      ['a', 'b', 'v'],
      ['ab', 'ac'],
      ['ab', 'bc'],
      ['ab', 'abc'],
      ['ac', 'b'],
      ['ac', 'abc'],
      ['bc', 'abc'],
    ];

    const result = filterCombinationsLength(arr);

    expect(result).toEqual([
      ['b', 'v'],
      ['a', 'b', 'v'],
      ['ac', 'b'],
    ]);
  });

  test('all uniq', () => {
    const arr = [['a']];

    const result = filterCombinationsUniq(arr);

    expect(result).toEqual([['a']]);
  });

  test('del "baa" uniq', () => {
    const arr = [['a'], ['baa', 'baa'], ['aga', 'b', 'v'], ['aga', 'agax']];

    const result = filterCombinationsUniq(arr);

    console.log(result);

    expect(result).toEqual([['a'], ['aga', 'b', 'v'], ['aga', 'agax']]);
  });

  //   test('del all combo uniq', () => {
  //     const arr = [
  //       ['a', 'a'],
  //       ['baa', 'baa'],
  //     ];

  //     const result = filterCombinationsUniq(arr);

  //     console.log(result);

  //     expect(result).toEqual([]);
  //   });
});
