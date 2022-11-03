type Listener<T> = (value: T) => void;

interface Observable<T> {
  subscribe: (listener: Listener<T>) => () => void;
}

interface ObservableInternal<T> extends Observable<T> {
  emit: (value: T) => void;
}

interface ReactiveObject<T> extends Observable<T> {
  getValue: () => T;
}

function createObservable<T>(): ObservableInternal<T> {
  let listeners: Listener<T>[] = [];

  const emit = (value: T): void => {
    listeners.forEach((listener) => listener(value));
  };

  const subscribe = (newListener: Listener<T>): () => void => {
    listeners = [...listeners, newListener];

    return () => { listeners = listeners.filter((listener) => listener !== newListener); };
  };

  return {
    emit,
    subscribe,
  };
}

export type { Observable, ObservableInternal, ReactiveObject };
export { createObservable };
