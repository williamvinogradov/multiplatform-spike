import {
  Disposable, DISPOSE, getKeys, ObjectType, SubscribeFunc,
} from '../utils';
import {
  createViewModel, SelectorMap, ViewModelMap,
} from '../view-model';

export interface ViewModelManager<TState, TViewModels extends ObjectType> {
  add: (
    stateValue: TState,
    subscribeToUpdates: SubscribeFunc<TState>,
    selectorMap: SelectorMap<TState, TViewModels>,
  ) => void;
  remove: (...viewModelKeyArray: (keyof TViewModels)[]) => void;
  get: () => Readonly<ViewModelMap<TViewModels>>;
}

export function createViewModelManager<TState, TViewModels extends ObjectType>()
: Disposable<ViewModelManager<TState, TViewModels>> {
  const viewModelMap: ViewModelMap<TViewModels> = {};

  const remove = (
    ...viewModelKeyArray: (keyof TViewModels)[]
  ): void => {
    viewModelKeyArray.forEach((key) => {
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
        remove(selectorKey);
      }

      const selector = selectorMap[selectorKey];
      if (selector) {
        viewModelMap[selectorKey] = createViewModel(stateValue, subscribeToUpdates, selector);
      }
    });
  };

  const get = () => viewModelMap as Readonly<ViewModelMap<TViewModels>>;

  const dispose = () => {
    getKeys(viewModelMap).forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      viewModelMap[key]![DISPOSE]();
    });
  };

  return {
    add,
    remove,
    get,
    [DISPOSE]: dispose,
  };
}
