import {
  Disposable,
  DISPOSE,
} from './disposable';

export type Listener<T> = (value: T) => void;

export interface Emitter<T> {
  emit: (value: T) => void;
}

export type Subscriber<T> = (listener: Listener<T>) => () => void;

export interface Observable<T> {
  subscribe: Subscriber<T>;
  getValue(): T;
}

export type ThinObservable<T> = Pick<Observable<T>, 'subscribe'>;

export function createObservableEmitter<T>(initialValue: T): Emitter<T> & Observable<T> {
  const listeners = new Set<Listener<T>>();
  let lastValue: T = initialValue;

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
}

export function createMappedObservable<TSource, TMapped>(
  initialValue: TSource,
  subscribe: Subscriber<TSource>,
  map: (x: TSource) => TMapped,
): Disposable<Observable<TMapped>> {
  const observable = createObservableEmitter<TMapped>(map(initialValue));

  const unsubscribe = subscribe((value) => observable.emit(map(value)));

  return {
    subscribe: observable.subscribe,
    getValue: observable.getValue,
    [DISPOSE]: unsubscribe,
  };
}
