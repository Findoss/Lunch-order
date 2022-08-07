export const arraysEqual = <T>(a1: T[], a2: T[]) => {
  return JSON.stringify(a1) == JSON.stringify(a2);
};
