type NotArray<T> = object & Exclude<T, unknown[]>;
type NotFunction<T> = object & Exclude<T, FunctionType>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FunctionType = (...args: any[]) => any;
export type ObjectType<T> = NotArray<T> & NotFunction<T>;
