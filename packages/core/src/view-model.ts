import {
  createMappedObservable,
  createDisposableCollector,
  Disposable,
  dispose,
  getKeys,
  Writeable,
  Observable,
} from './utils';

type ViewModel<TViewProps> = {
  readonly [K in keyof TViewProps]: Observable<TViewProps[K]>
};

type Selector<TState, TViewValue> = (state: TState | undefined) => TViewValue;

type ViewModelMap<TState, TProps> = {
  [K in keyof TProps]: Selector<TState, TProps[K]>
};

export function createViewModel<TStateProps, TViewProps>(
  state: Observable<TStateProps>,
  viewModelMap: ViewModelMap<TStateProps, TViewProps>,
): Disposable<ViewModel<TViewProps>> {
  const disposableCollector = createDisposableCollector();

  const viewModel = getKeys(viewModelMap)
    .reduce((vm, key) => {
      // eslint-disable-next-line no-param-reassign
      vm[key] = disposableCollector.peel(createMappedObservable(state, viewModelMap[key]));
      return vm;
    }, {} as Writeable<ViewModel<TViewProps>>);

  return {
    ...viewModel,
    [dispose]: disposableCollector[dispose],
  };
}
