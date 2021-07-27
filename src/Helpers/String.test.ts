import {describe, expect, test} from '@jest/globals';

import {parsePascal} from './String';

describe('parsing a pascal string', () => {
  const parsed = parsePascal('Test');

  test('produces an array', () => {
    expect(parsed).toBeInstanceOf(Array);
  });

  test('has lower cased the elements of the array', () => {
    expect(parsed).toEqual(['test']);
  });
});
