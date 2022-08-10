// Фильтрация комбинаций по длине
export const filterCombinationsLength = <T>(combinations: T[][]) => {
  return combinations.filter((combination) => {
    const l = combination.reduce((acc, v) => acc + v, '').length;
    return l > 1 && l < 4;
  });
};

// уникальные комбинации из массива опций
export const filterCombinationsUniq = <T>(combinations: T[][]) =>
  combinations.filter(
    (combination) =>
      !combination.filter((el, i, array) => array.indexOf(el) === i)
  );
