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
