import { ModelConfigMap } from './middlewares';
import { Handlers } from './reducer';
import { StateValue } from './state';
import {
  Disposable, ObjectType, PipeFunc,
} from './utils';
import { createStateManager, Dispatcher, StateManager } from './stateManager';
import { createViewModelManager, ViewModelManager } from './viewModelManager';

export type CreateCoreResult<TModel extends ObjectType,
  TDictionary extends ObjectType,
  THandlers extends Handlers<StateValue<TModel, TDictionary>>,
  TViewModels extends Record<PropertyKey, ObjectType>,
  > = [
    stateManager: StateManager<TModel, TDictionary>,
    viewModelManager: Disposable<ViewModelManager<StateValue<TModel, TDictionary>, TViewModels>>,
    dispatcher: Dispatcher<TModel, TDictionary, THandlers>,
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

    return [
      stateManager,
      viewModelManager,
      dispatcher,
    ];
  };
}
