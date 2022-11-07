import { memoize } from '../memoize';
import fn = jest.fn;

describe('Core: Utils: memoize', () => {
  it('Should always call cached func on the first call', () => {
    const spyFunc = fn();
    const cachedFunc = memoize(spyFunc, () => true);

    cachedFunc();

    expect(spyFunc).toHaveBeenCalled();
  });

  it('Shouldn\'t call comparer on the first call', () => {
    const spyFunc = fn();
    const spyComparer = fn();
    const cachedFunc = memoize(spyFunc, spyComparer);

    cachedFunc();

    expect(spyComparer).not.toHaveBeenCalled();
  });

  it('Shouldn\'t call cached func if the arguments haven\'t changed', () => {
    const args: [number, number] = [2, 2];
    const spyFunc = fn();
    const spyComparer = fn().mockReturnValue(true);
    const cachedFunc = memoize(spyFunc, spyComparer);

    cachedFunc(...args);
    cachedFunc(...args);
    cachedFunc(...args);

    expect(spyFunc).toHaveBeenCalledTimes(1);
  });

  it('Should call cached func if the arguments have changed', () => {
    const args: [number, number] = [2, 2];
    const spyComparer = fn().mockReturnValue(false);
    const spyFunc = fn();
    const cachedFunc = memoize(spyFunc, spyComparer);

    cachedFunc(...args);
    cachedFunc(...args);

    expect(spyFunc).toHaveBeenCalledTimes(2);
  });

  it('Should always call comparer, except first call', () => {
    const args: [number, number] = [2, 2];
    const spyFunc = fn();
    const spyComparer = fn();
    const cachedFunc = memoize(spyFunc, spyComparer);

    cachedFunc(...args);
    cachedFunc(...args);
    cachedFunc(...args);
    cachedFunc(...args);

    expect(spyComparer).toHaveBeenCalledTimes(3);
  });

  it('Should return cached result if the arguments haven\'t changed', () => {
    const args: [number, number] = [2, 2];
    const spyFunc = fn().mockImplementation(() => ({ result: 4 }));
    const spyComparer = fn().mockReturnValue(true);
    const cachedFunc = memoize(spyFunc, spyComparer);

    const firstResult = cachedFunc(...args);
    const secondResult = cachedFunc(...args);

    expect(firstResult).toBe(secondResult);
  });

  it('Should return new result from cached func if the arguments have changed', () => {
    const args: [number, number] = [2, 2];
    const spyFunc = fn().mockImplementation(() => ({ result: 4 }));
    const spyComparer = fn().mockReturnValue(false);
    const cachedFunc = memoize(spyFunc, spyComparer);

    const firstResult = cachedFunc(...args);
    const secondResult = cachedFunc(...args);

    expect(firstResult).not.toBe(secondResult);
  });
});
