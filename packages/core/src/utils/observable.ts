export type Listener<T> = (value: T) => void;

export interface Observable<T> {
  emit: (value: T) => void;
  subscribe: (listener: Listener<T>) => () => void;
}

export const createObservable = <T>(): Observable<T> => {
  const listeners = new Set<Listener<T>>();

  const emit = (value: T): void => {
    listeners.forEach((listener) => listener(value));
  };

  const subscribe = (newListener: Listener<T>): () => void => {
    listeners.add(newListener);

    return () => { listeners.delete(newListener); };
  };

  return {
    emit,
    subscribe,
  };
};
