import {
  Disposable,
  dispose,
} from './disposable';
import { PickPartial } from './types';

export type Listener<T> = (value: T) => void;

export interface Emitter<T> {
  emit: (value: T) => void;
}

export interface Observable<T> {
  subscribe: (listener: Listener<T>) => () => void;
  getValue(): T | undefined;
}

export type ThinObservable<T> = Pick<Observable<T>, 'subscribe'>;

export const createObservableEmitter = <T>(initialValue?: T): Emitter<T> & Observable<T> => {
  const listeners = new Set<Listener<T>>();
  let lastValue: T | undefined = initialValue;

  const emit = (value: T): void => {
    lastValue = value;
    listeners.forEach((listener) => listener(value));
  };

  const subscribe = (newListener: Listener<T>): () => void => {
    listeners.add(newListener);

    return () => { listeners.delete(newListener); };
  };

  const getValue = () => lastValue;

  return {
    emit,
    subscribe,
    getValue,
  };
};

export function createMappedObservable<T1, T2>(
  source: PickPartial<Observable<T1>, 'getValue'>,
  map: (x: T1 | undefined) => T2,
): Disposable<Observable<T2>> {
  const observable = createObservableEmitter<T2>(map(source.getValue?.()));

  const unsubscribe = source.subscribe((value) => observable.emit(map(value)));

  return {
    subscribe: observable.subscribe,
    getValue: observable.getValue,
    [dispose]: unsubscribe,
  };
}
