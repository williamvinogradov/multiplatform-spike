import { testFunction } from '../index';

describe('Test for test: ', () => {
  test('should return \'test\'', () => {
    const expectedResult = 'test';
    const result = testFunction();

    expect(result).toEqual(expectedResult);
  });
});
