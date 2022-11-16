import { Comparer, FunctionType } from './types';

export function memoize<TFunction extends FunctionType>(
  func: TFunction,
  comparer: Comparer<Parameters<TFunction>>,
): (...arg: Parameters<TFunction>) => ReturnType<TFunction> {
  let cachedArg: Parameters<TFunction>;
  let cachedResult: ReturnType<TFunction>;

  const updateCache = (...arg: Parameters<TFunction>) => {
    cachedArg = arg;
    cachedResult = func(arg);
    return cachedResult;
  };

  const getCachedResult = (...arg: Parameters<TFunction>) => (
    comparer(cachedArg, arg)
      ? cachedResult
      : updateCache(...arg)
  );

  let decoratedFunc = (...arg: Parameters<TFunction>) => {
    decoratedFunc = getCachedResult;
    return updateCache(...arg);
  };

  return (...arg: Parameters<TFunction>) => decoratedFunc(...arg);
}
