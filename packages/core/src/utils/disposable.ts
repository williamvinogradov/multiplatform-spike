export const dispose = Symbol('dispose');

export type DisposeFunc = () => void;

export type Disposable<T> = T & {
  [dispose]: DisposeFunc;
};
