import { shadowComparer } from '../shadowComparer';

describe('Core: Utils: shadowComparer', () => {
  test('It should return false if passed values have different js types', () => {
    const prev = { a: 1 } as unknown;
    const next = (() => {}) as unknown;

    const result = shadowComparer(prev, next);

    expect(result).toBeFalsy();
  });

  test('It should compare value types by value and return true if these values are equal', () => {
    const prev = 2;
    const next = 2;

    const result = shadowComparer(prev, next);

    expect(result).toBeTruthy();
  });

  test('It should compare value types by value and return false if these values aren\'t equal', () => {
    const prev = true;
    const next = false;

    const result = shadowComparer(prev, next);

    expect(result).toBeFalsy();
  });

  test('It should compare functions by reference and return true if these references are equal', () => {
    const firstFunc = () => {};

    const result = shadowComparer(firstFunc, firstFunc);

    expect(result).toBeTruthy();
  });

  test('It should compare functions by reference and return false if these references aren\'t equal', () => {
    const firstFunc = () => {};
    const secondFunc = () => {};

    const result = shadowComparer(firstFunc, secondFunc);

    expect(result).toBeFalsy();
  });

  test('It should return false if keys count aren\'t equal', () => {
    type Test = { a: number, b?: number };
    const prev:Test = { a: 1 };
    const next:Test = { a: 1, b: 2 };

    const result = shadowComparer(prev, next);

    expect(result).toBeFalsy();
  });

  test('It should return true if all keys on the first level are equal', () => {
    type Test = {
      a: number,
      ref: {
        b: number,
      },
      func: () => void,
      array: number[],
    };

    const testFunc = () => {};
    const testArray = [0, 1, 2];
    const testRef = { b: 2 };
    const prev: Test = {
      a: 1,
      ref: testRef,
      func: testFunc,
      array: testArray,
    };
    const next: Test = {
      a: 1,
      ref: testRef,
      func: testFunc,
      array: testArray,
    };

    const result = shadowComparer(prev, next);

    expect(result).toBeTruthy();
  });

  test('It should return false if some keys on the first level are different', () => {
    const prev = {
      ref: {
        b: 2,
      },
    };
    const next = {
      ref: {
        b: 2,
      },
    };

    const result = shadowComparer(prev, next);

    expect(result).toBeFalsy();
  });

  it('It should compare only first level keys', () => {
    type Test = {
      a: {
        b: boolean,
      }
    };
    const testRef: Test = {
      a: {
        b: true,
      },
    };
    const prev = testRef;
    const next = testRef;
    next.a.b = false;

    const result = shadowComparer(prev, next);

    expect(result).toBeTruthy();
  });
});
