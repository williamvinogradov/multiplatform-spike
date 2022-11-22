import {
  Comparer,
  createObservableEmitter,
  Disposable,
  DISPOSE,
  memoize,
  Observable,
  shadowComparer,
  SubscribeFunc,
} from './utils';

export type Selector<TState, TViewValue> = (state: TState) => TViewValue;

export type ViewModel<TViewProps> = Disposable<Observable<TViewProps>>;

export type SelectorMap<TState, TViewModels> = {
  [K in keyof TViewModels]?: Selector<TState, TViewModels[K]>
};

export type ViewModelMap<TViewModels> = {
  [K in keyof TViewModels]?: ViewModel<TViewModels[K]>
};

export function createSelector<TState, TParam extends Record<PropertyKey, unknown>, TViewProp>(
  buildViewProp: (params: TParam) => TViewProp,
  paramsGetter: (state: TState | undefined) => TParam,
  paramsComparer: Comparer<[TParam]> = shadowComparer,
): Selector<TState, TViewProp> {
  const cached = memoize(buildViewProp, paramsComparer);

  return (state: TState | undefined) => cached(paramsGetter(state));
}

export function createViewModel<TState, TViewProps>(
  initialState: TState,
  subscribeToUpdates: SubscribeFunc<TState>,
  selector: Selector<TState, TViewProps>,
): ViewModel<TViewProps> {
  const { emit, subscribe, getValue } = createObservableEmitter(selector(initialState));
  const unsubscribe = subscribeToUpdates((value) => emit(selector(value)));

  return {
    subscribe,
    getValue,
    [DISPOSE]: unsubscribe,
  };
}
