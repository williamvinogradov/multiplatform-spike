import {
  Comparer,
  createMappedObservable,
  Disposable,
  dispose,
  DisposeFunc,
  getKeys,
  memoize,
  Observable,
  pipe,
  shadowComparer,
} from './utils';
import { detach } from './utils/extension';

type WriteableViewModel<TViewProps> = {
  [K in keyof TViewProps]: Observable<TViewProps[K]>
};

type Selector<TState, TViewValue> = (state?: TState) => TViewValue;

type ViewModelMap<TState, TProps> = {
  [K in keyof TProps]: Selector<TState, TProps[K]>
};

export type ViewModel<TViewProps> = Readonly<WriteableViewModel<TViewProps>>;

export function createViewModel<TStateProps, TViewProps>(
  state: Observable<TStateProps>,
  viewModelMap: ViewModelMap<TStateProps, TViewProps>,
): Disposable<ViewModel<TViewProps>> {
  const disposeFunctions: DisposeFunc[] = [];

  const viewModel = getKeys(viewModelMap)
    .reduce((vm, key) => {
      const [observable, disposeFunc] = detach(
        createMappedObservable(state, viewModelMap[key]),
        dispose,
      );
      disposeFunctions.push(disposeFunc);
      // eslint-disable-next-line no-param-reassign
      vm[key] = observable;
      return vm;
    }, {} as WriteableViewModel<TViewProps>);

  return {
    ...viewModel,
    [dispose]: pipe(...disposeFunctions),
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
