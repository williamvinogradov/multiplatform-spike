export type PipeFunc<T> = (value: T) => T;

export const pipe = <T>(
  ...funcArray: PipeFunc<T>[]
): PipeFunc<T> => (value: T) => funcArray.reduce(
    (result, func) => func(result),
    value,
  );
