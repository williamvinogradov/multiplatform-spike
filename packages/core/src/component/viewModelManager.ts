import {
  Disposable, DISPOSE, getKeys, ObjectType, SubscribeFunc,
} from '../utils';
import {
  createViewModel, SelectorMap, ViewModelMap,
} from '../viewModel';

export interface ViewModelManager<TState, TViewModels extends ObjectType> {
  addViewModels: (
    stateValue: TState,
    subscribeToUpdates: SubscribeFunc<TState>,
    selectorMap: SelectorMap<TState, TViewModels>,
  ) => void;
  deleteViewModels: (...viewModelKeyArray: (keyof TViewModels)[]) => void;
  getViewModels: () => Readonly<ViewModelMap<TViewModels>>;
}

export function createViewModelManager<TState, TViewModels extends ObjectType>()
: Disposable<ViewModelManager<TState, TViewModels>> {
  const viewModelMap: ViewModelMap<TViewModels> = {};

  const deleteViewModels = (
    ...viewModelKeyArray: (keyof TViewModels)[]
  ): void => {
    viewModelKeyArray.forEach((key) => {
      viewModelMap[key]?.[DISPOSE]();
      delete viewModelMap[key];
    });
  };

  const addViewModels = (
    stateValue: TState,
    subscribeToUpdates: SubscribeFunc<TState>,
    selectorMap: SelectorMap<TState, TViewModels>,
  ) => {
    getKeys(selectorMap).forEach((selectorKey) => {
      if (viewModelMap[selectorKey]) {
        deleteViewModels(selectorKey);
      }

      const selector = selectorMap[selectorKey];
      if (selector) {
        viewModelMap[selectorKey] = createViewModel(stateValue, subscribeToUpdates, selector);
      }
    });
  };

  const getViewModels = () => viewModelMap as Readonly<ViewModelMap<TViewModels>>;

  const dispose = () => {
    getKeys(viewModelMap).forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      viewModelMap[key]![DISPOSE]();
    });
  };

  return {
    addViewModels,
    deleteViewModels,
    getViewModels,
    [DISPOSE]: dispose,
  };
}
