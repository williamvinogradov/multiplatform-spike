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
      const map = viewModelMap[key];
      const observable = createObservableEmitter(map(initialState));
      const unsubscribe = subscriber((value) => observable.emit(map(value)));

      disposeFunctions.push(unsubscribe);

      // eslint-disable-next-line no-param-reassign
      vm[key] = {
        subscribe: observable.subscribe,
        getValue: observable.getValue,
      };
      return vm;
    }, {} as WriteableViewModel<TViewProps>);

  return {
    ...viewModel,
    [DISPOSE]: pipe(...disposeFunctions),
  };
}

export function createSelector<TState, TParam extends Record<PropertyKey, unknown>, TViewProp>(
  buildViewProp: (params: TParam) => TViewProp,
  paramsGetter: (state: TState | undefined) => TParam,
  paramsComparer: Comparer<[TParam]> = shadowComparer,
): Selector<TState, TViewProp> {
  const cached = memoize(buildViewProp, paramsComparer);

  return (state: TState | undefined) => cached(paramsGetter(state));
}
