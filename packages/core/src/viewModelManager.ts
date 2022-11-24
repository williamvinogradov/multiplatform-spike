import {
  Disposable, DISPOSE, getKeys, ObjectType, SubscribeFunc,
} from './utils';
import {
  createViewModel, SelectorMap, ViewModelMap,
} from './view-model';

export interface ViewModelManager<TState extends ObjectType, TViewModels extends ObjectType> {
  add: (
    stateValue: TState,
    subscribeToUpdates: SubscribeFunc<TState>,
    selectorMap: SelectorMap<TState, TViewModels>,
  ) => void;
  remove: (...keys: (keyof TViewModels)[]) => void;
  get: () => Readonly<ViewModelMap<TViewModels>>;
}

export function createViewModelManager<TState extends ObjectType, TViewModels extends ObjectType>()
: Disposable<ViewModelManager<TState, TViewModels>> {
  const viewModelMap: ViewModelMap<TViewModels> = {};

  const remove = (
    ...keys: (keyof TViewModels)[]
  ): void => {
    keys.forEach((key) => {
      viewModelMap[key]?.[DISPOSE]();
      delete viewModelMap[key];
    });
  };

  const add = (
    stateValue: TState,
    subscribeToUpdates: SubscribeFunc<TState>,
    selectorMap: SelectorMap<TState, TViewModels>,
  ) => {
    getKeys(selectorMap).forEach((selectorKey) => {
      if (viewModelMap[selectorKey]) {
        throw Error(`View model with ${selectorKey.toString()} already exist.`);
      }

      const selector = selectorMap[selectorKey];
      if (selector) {
        viewModelMap[selectorKey] = createViewModel(stateValue, subscribeToUpdates, selector);
      }
    });
  };

  const get = () => viewModelMap as Readonly<ViewModelMap<TViewModels>>;

  const dispose = () => {
    Object.values(viewModelMap)
      .filter((viewModel) => !!viewModel)
      .forEach((viewModel) => {
        viewModel[DISPOSE]();
      });
  };

  return {
    add,
    remove,
    get,
    [DISPOSE]: dispose,
  };
}
