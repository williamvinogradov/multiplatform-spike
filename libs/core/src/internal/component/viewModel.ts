import {createCache, createObservable, Observable, shadowComparer, Comparer, ReactiveObject, getKeys} from '../utils';


type ViewModelFunc<TState, TViewModel> = (stateValue: TState) => TViewModel;
interface ViewModel<TViewModel> extends Observable<TViewModel> {
  getValue: () => TViewModel;
}

type ViewModelFuncMap<TState, TViewModels> = { [P in keyof TViewModels]: ViewModelFunc<TState, TViewModels[P]>};
type ViewModelMap<TViewModels> = { readonly [P in keyof TViewModels ]: ViewModel<TViewModels[P]>};

const createViewModelFunc = <TState, TParams extends {}, TViewModel>(
  getParams: (state: TState) => TParams,
  createViewModel: (params: TParams) => TViewModel,
  paramsComparer: Comparer<TParams> = shadowComparer,
): ViewModelFunc<TState, TViewModel> => {
  const cachedCreateViewModel = createCache(createViewModel, paramsComparer);

  return (stateValue: TState) => {
    const viewModelParams = getParams(stateValue);
    return cachedCreateViewModel(viewModelParams);
  }
}

const createViewModel = <TState, TViewModel>(
  state: ReactiveObject<TState>,
  viewModelFunc: ViewModelFunc<TState, TViewModel>,
): [ViewModel<TViewModel>, () => void] => {
  let viewModel = viewModelFunc(state.getValue());

  const {emit, subscribe} = createObservable<TViewModel>();

  const unsubscribe = state.subscribe((stateValue: TState) => {
    viewModel = viewModelFunc(stateValue);
    emit(viewModel);
  });

  return [{
    getValue: () => viewModel,
    subscribe,
  }, unsubscribe];
}

const createViewModelMap = <TState, TComponentViewModels>(
  state: ReactiveObject<TState>,
  viewModelFuncMap: ViewModelFuncMap<TState, TComponentViewModels>,
): [ViewModelMap<TComponentViewModels>, (() => void)[]] => {
  const unsubscribeArray: (() => void)[] = [];
  const result: Partial<ViewModelMap<TComponentViewModels>> = {};
  getKeys(viewModelFuncMap).forEach((key) => {
    const [viewModel, unsubscribe] = createViewModel(state, viewModelFuncMap[key]);
    result[key] = viewModel;
    unsubscribeArray.push(unsubscribe);
  });

  return [result as ViewModelMap<TComponentViewModels>, unsubscribeArray]
}

export type {
  ViewModelFunc,
  ViewModel,

  ViewModelFuncMap,
  ViewModelMap,
}

export {
  createViewModelFunc,
  createViewModel,
  createViewModelMap,
}

