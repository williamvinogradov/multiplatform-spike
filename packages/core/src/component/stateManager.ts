import { callbacksMiddleware, controlledModeMiddleware, ModelConfigMap } from '../middlewares';
import { createReducer, Handlers } from '../reducer';
import { createState, StateValue } from '../state';
import { ObjectType, pipe, PipeFunc } from '../utils';

export interface StateManager<
  TModel extends ObjectType,
  TDictionary extends ObjectType,
  > {
  addUpdate: (statePart: Partial<StateValue<Partial<TModel>, Partial<TDictionary>>>) => void;
  commitUpdates: () => void;
  rollbackUpdates: () => void;
}

export interface Dispatcher<
  TModel extends ObjectType,
  TDictionary extends ObjectType,
  THandlers extends Handlers<StateValue<TModel, TDictionary>>,
  > {
  dispatch: <TAction extends keyof THandlers>(
    action: TAction,
    value: Parameters<THandlers[TAction]>[1],
  ) => void;
}

export type StateStoreTuple<
  TModel extends ObjectType,
  TDictionary extends ObjectType,
  THandlers extends Handlers<StateValue<TModel, TDictionary>>,
  > = [
  store: StateManager<TModel, TDictionary>,
  dispatcher: Dispatcher<TModel, TDictionary, THandlers>,
  ];

export function createStateManager<
  TModel extends ObjectType,
  TDictionary extends ObjectType,
  THandlers extends Handlers<StateValue<TModel, TDictionary>>,
  >(
  initialState: StateValue<TModel, TDictionary>,
  stateConfig: ModelConfigMap<TModel>,
  actionHandlers: THandlers,
  validation: PipeFunc<StateValue<TModel, TDictionary>>[] = [],
): StateStoreTuple<TModel, TDictionary, THandlers> {
  const state = createState(initialState);
  const reducer = createReducer<StateValue<TModel, TDictionary>>()(actionHandlers);
  const validator = pipe(...validation);

  // private methods.
  const changeModel = (stateValue: StateValue<TModel, TDictionary>, forceRender = false): void => {
    const currentModel = state.getCurrent().model;
    const validatedStateValue = validator(stateValue);

    const pendingCallbacks = callbacksMiddleware(
      currentModel,
      validatedStateValue.model,
      stateConfig,
    );
    const [newModel, hasChanges] = controlledModeMiddleware(
      currentModel,
      validatedStateValue.model,
      stateConfig,
    );

    if (hasChanges) {
      state.addUpdate({ model: newModel });
      state.commitUpdates();
    }

    if (forceRender || (!forceRender && hasChanges)) {
      state.triggerRender(state.getCurrent());
    }

    pendingCallbacks.forEach((callback) => callback());
  };

  // public methods.
  const commitUpdates = () => {
    state.commitUpdates();
    changeModel(state.getCurrent(), true);
  };

  const dispatch = <TAction extends keyof THandlers>(
    action: TAction,
    value: Parameters<THandlers[TAction]>[1],
  ) => {
    const currentStateVersion = state.getCurrent();
    const newStateVersion = {
      ...currentStateVersion,
      model: {
        ...currentStateVersion.model,
        ...reducer(currentStateVersion, action, value),
      },
    };

    changeModel(newStateVersion);
  };

  return [{
    addUpdate: state.addUpdate,
    commitUpdates,
    rollbackUpdates: state.rollbackUpdates,
  }, {
    dispatch,
  }];
}
