import { createCache } from '../cache';
import fn = jest.fn;

describe('Core: Utils: cache', () => {
  const funcToCache = (a: number, b: number) => ({
    result: a + b,
  });

  const testComparer = (
    prev: [number, number],
    next: [number, number],
  ) => prev[0] === next[0] && prev[1] === next[1];

  test('It should always call cached func on the first call', () => {
    const spyFunc = fn().mockReturnValue({ result: 4 });
    const cachedFunc = createCache(spyFunc, () => true);

    cachedFunc();

    expect(spyFunc).toHaveBeenCalled();
  });

  test('It shouldn\'t call comparer on the first call', () => {
    const spyComparer = fn().mockReturnValue(true);
    const cachedFunc = createCache(() => 4, spyComparer);

    cachedFunc();

    expect(spyComparer).not.toHaveBeenCalled();
  });

  test('It shouldn\'t call cached func if the arguments haven\'t changed', () => {
    const spyFunc = fn().mockReturnValue({ result: 4 });
    const args: [number, number] = [2, 2];
    const cachedFunc = createCache(spyFunc, testComparer);

    cachedFunc(...args);
    cachedFunc(...args);
    cachedFunc(...args);

    expect(spyFunc).toHaveBeenCalledTimes(1);
  });

  test('It should call cached func if the arguments have changed', () => {
    const spyFunc = fn().mockReturnValue({ result: 4 });
    const firstArgs: [number, number] = [2, 2];
    const secondArgs: [number, number] = [2, 1];
    const cachedFunc = createCache(spyFunc, testComparer);

    cachedFunc(...firstArgs);
    cachedFunc(...secondArgs);

    expect(spyFunc).toHaveBeenCalledTimes(2);
  });

  test('It should call always call comparer, except first call', () => {
    const spyComparer = fn().mockReturnValue(true);
    const args: [number, number] = [2, 2];
    const cachedFunc = createCache(funcToCache, spyComparer);

    cachedFunc(...args);
    cachedFunc(...args);
    cachedFunc(...args);
    cachedFunc(...args);

    expect(spyComparer).toHaveBeenCalledTimes(3);
  });

  test('It should return cached result if the arguments haven\'t changed', () => {
    const args: [number, number] = [2, 2];
    const cachedFunc = createCache(funcToCache, testComparer);

    const firstResult = cachedFunc(...args);
    const secondResult = cachedFunc(...args);

    expect(firstResult === secondResult).toBeTruthy();
  });

  test('It should return new result from cached func if the arguments have changed', () => {
    const firstArgs: [number, number] = [2, 2];
    const secondArgs: [number, number] = [2, 1];
    const cachedFunc = createCache(funcToCache, testComparer);

    const firstResult = cachedFunc(...firstArgs);
    const secondResult = cachedFunc(...secondArgs);

    expect(firstResult !== secondResult).toBeTruthy();
  });
});
