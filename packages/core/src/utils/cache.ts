import { FunctionType } from './types';

const createCache = <TFunction extends FunctionType>(
  func: TFunction,
  comparer: (prev: Parameters<TFunction>, next: Parameters<TFunction>) => boolean,
): (...arg: Parameters<TFunction>) => ReturnType<TFunction> => {
  let cachedArg: Parameters<TFunction>;
  let cachedResult: ReturnType<TFunction>;

  return (...arg: Parameters<TFunction>) => {
    const comparerResult = cachedArg !== undefined && comparer(cachedArg, arg);

    if (comparerResult) {
      return cachedResult;
    }

    cachedArg = arg;
    cachedResult = func(...arg) as ReturnType<TFunction>;

    return cachedResult;
  };
};

export { createCache };
