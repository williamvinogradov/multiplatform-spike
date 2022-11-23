import { ModelConfigMap } from '../middlewares';
import { Handlers } from '../reducer';
import { StateValue } from '../state';
import {
  detach,
  Disposable, DISPOSE, ObjectType, PipeFunc,
} from '../utils';
import { createStateManager, Dispatcher, StateManager } from './stateManager';
import { createViewModelManager, ViewModelManager } from './viewModelManager';

export type RootCore<TModel extends ObjectType, TDictionary extends ObjectType> =
  Disposable<StateManager<TModel, TDictionary>>;

export type ContainerCore<
  TModel extends ObjectType,
  TDictionary extends ObjectType,
  THandlers extends Handlers<StateValue<TModel, TDictionary>>,
  TViewModels extends ObjectType,
  > = ViewModelManager<StateValue<TModel, TDictionary>, TViewModels>
  & Dispatcher<TModel, TDictionary, THandlers>;

export type CreateCoreResult<TModel extends ObjectType,
  TDictionary extends ObjectType,
  THandlers extends Handlers<StateValue<TModel, TDictionary>>,
  TViewModels extends Record<PropertyKey, ObjectType>,
  > = [
  rootComponent: RootCore<TModel, TDictionary>,
  containerComponent: ContainerCore<TModel, TDictionary, THandlers, TViewModels>,
  ];

export function createCore<TViewModels extends ObjectType>() {
  return <
    TModel extends ObjectType,
    TDictionary extends ObjectType,
    THandlers extends Handlers<StateValue<TModel, TDictionary>>,
    >(
    initialState: StateValue<TModel, TDictionary>,
    stateConfig: ModelConfigMap<TModel>,
    actionHandlers: THandlers,
    validation: PipeFunc<StateValue<TModel, TDictionary>>[] = [],
  ): CreateCoreResult<TModel, TDictionary, THandlers, TViewModels> => {
    const [stateManager, dispatcher] = createStateManager(
      initialState,
      stateConfig,
      actionHandlers,
      validation,
    );
    const viewModelManager = createViewModelManager<StateValue<TModel, TDictionary>, TViewModels>();

    const dispose = () => {
      viewModelManager[DISPOSE]();
    };

    const [publicViewModelManager] = detach(viewModelManager, DISPOSE);
    return [{
      ...stateManager,
      [DISPOSE]: dispose,
    }, {
      ...publicViewModelManager,
      ...dispatcher,
    }];
  };
}
