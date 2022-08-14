export const arraysEqualOrderEl = <T>(a1: T[], a2: T[]) => {
  return JSON.stringify(a1) == JSON.stringify(a2);
};

export const arraysEqual = <T>(a1: T[], a2: T[]) => {
  return (
    a1.length === a2.length && a1.filter((v) => !a2.includes(v)).length === 0
  );
};
