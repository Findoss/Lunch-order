// Составление комбинаций
export const combine = <T>(arr: T[], k: number, withRepetition = false) => {
  const combinations: T[][] = [];
  const combination: T[] = Array(k);
  const internalCombine = (start: number, depth: number): void => {
    if (depth === k) {
      combinations.push([...combination]);
      return;
    }
    for (let index = start; index < arr.length; ++index) {
      combination[depth] = arr[index];
      internalCombine(index + (withRepetition ? 0 : 1), depth + 1);
    }
  };
  internalCombine(0, 0);
  return combinations;
};

// Фильтрация комбинаций по длине
export const filterCombinationsLength = <T>(combinations: T[][]) => {
  return combinations.filter((combination) => {
    const l = combination.reduce((acc, v) => acc + v, '').length;
    return l > 1 && l < 4;
  });
};

// уникальные комбинации из массива опций
export const filterCombinationsUniq = <T>(combinations: T[][]) => {
  return combinations.filter((combination) => {
    const str = combination.reduce((acc, v) => acc + v, '');
    return !/(.).*\1/.test(str);
  });
};

// console.log(
//   combine<string>(['a', 'b', 'c', 'ab', 'ac', 'bc', 'abc'], 2, false)
// );

// console.log(
//   filterCombinationsLength<string>(
//     combine<string>(['a', 'b', 'c', 'ab', 'ac', 'bc', 'abc'], 2, false)
//   )
// );

// console.log(
//   filterCombinationsUniq(
//     filterCombinationsLength([
//       ...combine(['a', 'b', 'c', 'ab', 'ac', 'bc', 'abc'], 2),
//       ...combine(['a', 'b', 'c', 'ab', 'ac', 'bc', 'abc'], 3),
//     ])
//   )
// );

const menu = [
  {
    combo: ['salad'],
    price: 130,
  },
  {
    combo: ['sup'],
    price: 130,
  },
  //   {
  //     combo: ['dish'],
  //     price: 200,
  //   },
  {
    combo: ['salad', 'sup'],
    price: 250,
  },
  //   {
  //     combo: ['salad', 'dish'],
  //     price: 280,
  //   },
  //   {
  //     combo: ['sup', 'dish'],
  //     price: 280,
  //   },
  //   {
  //     combo: ['salad', 'sup', 'dish'],
  //     price: 350,
  //   },
];

const step1 = combine(menu, 2);
console.log(step1);
