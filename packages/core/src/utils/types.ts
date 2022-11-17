// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ObjectType = Record<PropertyKey, any>;
export type Comparer<T> = (prev: T, next: T) => boolean;
export type ActionFunc = () => void;

export type PickPartial<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Pick<Partial<T>, K>;
