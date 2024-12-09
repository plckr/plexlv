import { describe, expect, it } from 'vitest';

import { truncate } from './string';

describe('truncate', () => {
  const len = 50;

  const str = (length: number) => {
    return new Array(length).fill('a').join('');
  };

  it('max length', () => {
    expect(truncate(str(len * 2), len)).toHaveLength(len);
    expect(truncate(str(len / 2), len)).toHaveLength(len / 2);
    expect(truncate(str(len), len)).toHaveLength(len);
  });

  it('ellipsis', () => {
    expect(truncate(str(len * 2), len)).toMatch(/\.\.\.$/);
    expect(truncate(str(len), len)).toMatch(str(len));
  });

  it('empty', () => {
    expect(truncate('', len)).toBe('');
  });
});
