import {
  createMappedObservable,
  createDisposableCollector,
  Disposable,
  dispose,
  getKeys,
  Observable,
} from './utils';

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
  const disposableCollector = createDisposableCollector();

  const viewModel = getKeys(viewModelMap)
    .reduce((vm, key) => {
      // eslint-disable-next-line no-param-reassign
      vm[key] = disposableCollector.peel(createMappedObservable(state, viewModelMap[key]));
      return vm;
    }, {} as WriteableViewModel<TViewProps>);

  return {
    ...viewModel,
    [dispose]: disposableCollector[dispose],
  };
}
