import { createCache } from '../cache';
import fn = jest.fn;

describe('Core: Utils: cache', () => {
  test('It should always call cached func on the first call', () => {
    const spyFunc = fn();
    const cachedFunc = createCache(spyFunc, () => true);

    cachedFunc();

    expect(spyFunc).toHaveBeenCalled();
  });

  test('It shouldn\'t call comparer on the first call', () => {
    const spyComparer = fn();
    const cachedFunc = createCache(() => 4, spyComparer);

    cachedFunc();

    expect(spyComparer).not.toHaveBeenCalled();
  });

  test('It shouldn\'t call cached func if the arguments haven\'t changed', () => {
    const args: [number, number] = [2, 2];
    const spyFunc = fn();
    const spyComparer = fn().mockReturnValue(true);
    const cachedFunc = createCache(spyFunc, spyComparer);

    cachedFunc(...args);
    cachedFunc(...args);
    cachedFunc(...args);

    expect(spyFunc).toHaveBeenCalledTimes(1);
  });

  test('It should call cached func if the arguments have changed', () => {
    const args: [number, number] = [2, 2];
    const spyComparer = fn().mockReturnValue(false);
    const spyFunc = fn();
    const cachedFunc = createCache(spyFunc, spyComparer);

    cachedFunc(...args);
    cachedFunc(...args);

    expect(spyFunc).toHaveBeenCalledTimes(2);
  });

  test('It should always call comparer, except first call', () => {
    const args: [number, number] = [2, 2];
    const spyFunc = fn();
    const spyComparer = fn();
    const cachedFunc = createCache(spyFunc, spyComparer);

    cachedFunc(...args);
    cachedFunc(...args);
    cachedFunc(...args);
    cachedFunc(...args);

    expect(spyComparer).toHaveBeenCalledTimes(3);
  });

  test('It should return cached result if the arguments haven\'t changed', () => {
    const args: [number, number] = [2, 2];
    const spyFunc = fn().mockImplementation(() => ({ result: 4 }));
    const spyComparer = fn().mockReturnValue(true);
    const cachedFunc = createCache(spyFunc, spyComparer);

    const firstResult = cachedFunc(...args);
    const secondResult = cachedFunc(...args);

    expect(firstResult).toBe(secondResult);
  });

  test('It should return new result from cached func if the arguments have changed', () => {
    const args: [number, number] = [2, 2];
    const spyFunc = fn().mockImplementation(() => ({ result: 4 }));
    const spyComparer = fn().mockReturnValue(false);
    const cachedFunc = createCache(spyFunc, spyComparer);

    const firstResult = cachedFunc(...args);
    const secondResult = cachedFunc(...args);

    expect(firstResult).not.toBe(secondResult);
  });
});
