type DisposeFunc = () => void;

type Peeled<
  TDisposable extends Disposable<unknown>,
> = TDisposable extends Disposable<infer T> ? T : never;

export const dispose = Symbol('dispose');

export type Disposable<T> = T & {
  [dispose]: DisposeFunc;
};

export type DisposableLike<T> = T & {
  [dispose]?: DisposeFunc;
};

export function createDisposableCollector(): Disposable<{
  peel<TDisposable extends Disposable<unknown>>(obj: TDisposable): Peeled<TDisposable>
}> {
  const functions: DisposeFunc[] = [];
  return {
    peel<TDisposable extends Disposable<unknown>>(
      { [dispose]: disposeFunc, ...rest }: TDisposable,
    ) {
      functions.push(disposeFunc);
      return rest as Peeled<TDisposable>;
    },

    [dispose]() {
      functions.forEach((f) => f());
    },
  };
}
