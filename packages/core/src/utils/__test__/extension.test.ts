import { detach, Extended } from '../extension';

describe('extension', () => {
  it('can be detached', () => {
    const s = Symbol('s');
    const expected = {};
    const extended: Extended<Record<string, unknown>, typeof s, unknown> = { a: 1, [s]: expected };

    const [, actual] = detach(extended, s);

    expect(actual).toBe(expected);
  });

  it('copies other properties', () => {
    const s = Symbol('s');
    const expected = { a: 1, b: 2 };
    const extended: Extended<{ a: number, b: number }, typeof s, unknown> = {
      ...expected,
      [s]: {},
    };

    const [actual] = detach(extended, s);

    expect(actual).toStrictEqual(expected);
  });

  it('does not modify argument', () => {
    const s = Symbol('s');
    const value = {};
    const expected = { a: 1, b: 2, [s]: value };
    const extended = { a: 1, b: 2, [s]: value };

    detach(extended, s);

    expect(extended).toStrictEqual(expected);
  });
});

describe('multiple extensions', () => {
  it('can be detached', () => {
    const s1 = Symbol('s1');
    const s2 = Symbol('s2');
    type S1 = { s1Prop: unknown; };
    type S2 = { s2Prop: unknown; };

    const expected1 = { s1Prop: {} };
    const expected2 = { s2Prop: {} };
    const extended: Extended<
    Extended<{ a: number, b: number }, typeof s1, S1>,
        typeof s2,
    S2
    > = {
      a: 1, b: 2, [s1]: expected1, [s2]: expected2,
    };

    const [, actual1] = detach(extended, s1);
    const [, actual2] = detach(extended, s2);

    expect(actual1).toBe(expected1);
    expect(actual2).toBe(expected2);
  });

  it('copies other properties', () => {
    const s1 = Symbol('s1');
    const s2 = Symbol('s2');

    const expected = { a: 1, b: 2 };
    const extended: Extended<
    Extended<{ a: number, b: number }, typeof s1, unknown>,
        typeof s2,
    unknown
    > = { ...expected, [s1]: {}, [s2]: {} };

    const [nextExtended] = detach(extended, s2);
    const [actual] = detach(nextExtended, s1);

    expect(actual).toStrictEqual(expected);
  });

  it('does not modify argument', () => {
    const s1 = Symbol('s1');
    const s2 = Symbol('s2');
    type S1 = { s1Prop: unknown; };
    type S2 = { s2Prop: unknown; };

    const expected = {
      a: 1, b: 2, [s1]: { s1Prop: {} }, [s2]: { s2Prop: {} },
    };
    const extended: Extended<
    Extended<{ a: number, b: number }, typeof s1, S1>,
        typeof s2,
    S2
    > = expected;

    detach(extended, s1);
    detach(extended, s2);

    expect(extended).toStrictEqual(expected);
  });
});
