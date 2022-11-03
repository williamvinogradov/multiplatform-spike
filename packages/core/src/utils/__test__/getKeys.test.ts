import { getKeys } from '../getKeys';

describe('Core: Utils: getKeys', () => {
  const testObj = {
    a: 1,
    b: '2',
    c: true,
  };

  test('It should returns key array of the passed object', () => {
    const expectedResult = ['a', 'b', 'c'];

    const keys = getKeys(testObj);

    expect(keys).toEqual(expectedResult);
  });
});
