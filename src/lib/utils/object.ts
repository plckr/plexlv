export function objectKeys<K extends PropertyKey>(object: Record<K, unknown>): Array<K> {
  return Object.keys(object) as Array<K>;
}

// TODO: Better type support
export const filterObjectKeys = <K extends PropertyKey>(
  obj: Record<K, unknown>,
  allowedKeys: K[]
) => {
  const filtered = objectKeys(obj)
    .filter((key) => allowedKeys.includes(key))
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {} as Record<K, (typeof obj)[K]>);

  return filtered;
};

export const isObject = <T extends object>(obj: unknown): obj is T => {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
};
