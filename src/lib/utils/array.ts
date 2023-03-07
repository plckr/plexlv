export const isArray = <T extends unknown[]>(arr: unknown): arr is T => {
  return Array.isArray(arr);
};
