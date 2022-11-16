import { Extended } from './extension';

export const dispose = Symbol('dispose');

export type DisposeFunc = () => void;

export type Disposable<T> = Extended<T, typeof dispose, DisposeFunc>;
