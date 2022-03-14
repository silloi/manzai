import { parseText } from "../src/parse";

describe('test paseText', () => {
  test('pattern 1', () => {
    const result = parseText('pattern 1');
    expect(result).toBe('pattern 1');
  });

  test('pattern 2', () => {
    const result = parseText('pattern 2');
    expect(result).toBe('pattern 2');
  });
});
