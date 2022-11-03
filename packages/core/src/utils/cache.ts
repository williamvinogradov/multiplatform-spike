// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Func = (...args: any[]) => any;

const createCache = <TFunction extends Func>(
  func: TFunction,
  comparer: (prev: Parameters<TFunction>, next: Parameters<TFunction>) => boolean,
): (...arg: Parameters<TFunction>) => ReturnType<TFunction> => {
  let isFirstCall = true;
  let cachedArg: Parameters<TFunction>;
  let cachedResult: ReturnType<TFunction>;

  return (...arg: Parameters<TFunction>) => {
    const comparerResult = !isFirstCall && comparer(cachedArg, arg);

    if (comparerResult) {
      return cachedResult;
    }

    isFirstCall = false;
    cachedArg = arg;
    cachedResult = func(...arg) as ReturnType<TFunction>;

    return cachedResult;
  };
};

export { createCache };
