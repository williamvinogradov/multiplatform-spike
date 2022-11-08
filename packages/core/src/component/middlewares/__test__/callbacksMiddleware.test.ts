import { callbacksMiddleware } from '../callbacksMiddleware';
import { getChangedKeys } from '../getChangedKeys';

jest.mock('../getChangedKeys');
const getChangedKeysMock = jest.mocked(getChangedKeys);

describe('Core: Component: Middlewares: callbacksMiddleware', () => {
  it('Returns empty functions array if config not set', () => {
    const prev = { a: 1, b: 2 };
    const next = { a: 3, b: 4 };
    getChangedKeysMock.mockReturnValue(['a', 'b']);

    const funcArray = callbacksMiddleware(prev, next);

    expect(funcArray).toEqual([]);
  });

  it('Returns functions array of the changed values callbacks', () => {
    const result: number[] = [];
    const expectedResult = [4, 6];
    const prev = { a: 1, b: 2, c: 3 };
    const next = { a: 4, b: 5, c: 6 };
    const config = {
      a: {
        isControlled: true,
        publicCallback: (value: number) => { result.push(value); },
      },
      c: {
        isControlled: false,
        publicCallback: (value: number) => { result.push(value); },
      },
    };
    getChangedKeysMock.mockReturnValue(['a', 'b', 'c']);

    const funcArray = callbacksMiddleware(prev, next, config);
    funcArray.forEach((func) => func());

    expect(result).toEqual(expectedResult);
  });
});
