import {
  Comparer,
  createObservableEmitter,
  Disposable,
  DISPOSE,
  DisposeFunc,
  getKeys,
  memoize,
  Observable,
  pipe,
  shadowComparer,
  Subscriber,
} from './utils';

type WriteableViewModel<TViewProps> = {
  [K in keyof TViewProps]: Observable<TViewProps[K]>
};

type Selector<TState, TViewValue> = (state: TState) => TViewValue;

type ViewModelMap<TState, TProps> = {
  [K in keyof TProps]: Selector<TState, TProps[K]>
};

export type ViewModel<TViewProps> = Readonly<WriteableViewModel<TViewProps>>;

export function createViewModel<TStateProps, TViewProps>(
  initialState: TStateProps,
  subscriber: Subscriber<TStateProps>,
  viewModelMap: ViewModelMap<TStateProps, TViewProps>,
): Disposable<ViewModel<TViewProps>> {
  const disposeFunctions: DisposeFunc[] = [];

  const viewModel = getKeys(viewModelMap)
    .reduce((vm, key) => {
      // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-use-before-define
      vm[key] = buildObservable(viewModelMap[key]);
      return vm;
    }, {} as WriteableViewModel<TViewProps>);

  return {
    ...viewModel,
    [DISPOSE]: pipe(...disposeFunctions),
  };

  function buildObservable<TMapped>(map: (x: TStateProps) => TMapped): Observable<TMapped> {
    const observable = createObservableEmitter<TMapped>(map(initialState));

    const unsubscribe = subscriber((value) => observable.emit(map(value)));

    disposeFunctions.push(unsubscribe);

    return {
      subscribe: observable.subscribe,
      getValue: observable.getValue,
    };
  }
}

export function createSelector<TState, TParam extends Record<PropertyKey, unknown>, TViewProp>(
  buildViewProp: (params: TParam) => TViewProp,
  paramsGetter: (state: TState | undefined) => TParam,
  paramsComparer: Comparer<[TParam]> = shadowComparer,
): Selector<TState, TViewProp> {
  const cached = memoize(buildViewProp, paramsComparer);

  return (state: TState | undefined) => cached(paramsGetter(state));
}
