// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FunctionType = (...args: any[]) => any;

type NotArray<T> = object & Exclude<T, unknown[]>;
type NotFunction<T> = object & Exclude<T, FunctionType>;
type ObjectType<T> = NotArray<T> & NotFunction<T>;

export type {
  FunctionType,
  ObjectType,
};
