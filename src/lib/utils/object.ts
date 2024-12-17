/**
 * Return an array of an object's own enumerable property names.
 *
 * @typeParam K - Type of the object's keys
 * @param object - Object to get keys from
 * @returns Array of the object's keys
 */
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
    .reduce(
      (acc, key) => {
        acc[key] = obj[key];
        return acc;
      },
      {} as Record<K, (typeof obj)[K]>
    );

  return filtered;
};

/**
 * Checks if a value is an object.
 *
 * @template T - Type of the object. Should be a subtype of `object`.
 * @param obj - Value to check
 * @returns Whether the value is an object
 */
export const isObject = <T extends object>(obj: unknown): obj is T => {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
};
