import { callbacksMiddleware, controlledModeMiddleware, ModelConfigMap } from '../middlewares';
import { createReducer, Handlers } from '../reducer';
import { createState, StateValue } from '../state';
import {
  ObjectType, pipe, PipeFunc,
} from '../utils';

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

  const changeState = (
    currentStateValue: StateValue<TModel, TDictionary>,
    validatedStateValue: StateValue<TModel, TDictionary>,
  ): boolean => {
    const [newModel, hasChanges] = controlledModeMiddleware(
      currentStateValue.model,
      validatedStateValue.model,
      stateConfig,
    );

    if (hasChanges) {
      state.addUpdate({ model: newModel });
      state.commitUpdates();
    }

    return hasChanges;
  };

  const callCallbacks = (
    currentStateValue: StateValue<TModel, TDictionary>,
    validatedStateValue: StateValue<TModel, TDictionary>,
  ): void => {
    const pendingCallbacks = callbacksMiddleware(
      currentStateValue.model,
      validatedStateValue.model,
      stateConfig,
    );

    pendingCallbacks.forEach((callback) => callback());
  };

  const commitUpdates = () => {
    state.commitUpdates();

    const currentStateValue = state.getCurrent();
    const validatedStateValue = validator(currentStateValue);

    changeState(currentStateValue, validatedStateValue);
    state.triggerRender(state.getCurrent());

    callCallbacks(currentStateValue, validatedStateValue);
  };

  const dispatch = <TAction extends keyof THandlers>(
    action: TAction,
    value: Parameters<THandlers[TAction]>[1],
  ) => {
    const currentStateValue = state.getCurrent();
    const newStateVersion = {
      ...currentStateValue,
      model: {
        ...currentStateValue.model,
        ...reducer(currentStateValue, action, value),
      },
    };
    const validatedStateValue = validator(newStateVersion);

    const hasChanges = changeState(currentStateValue, validatedStateValue);

    if (hasChanges) {
      state.triggerRender(state.getCurrent());
    }

    callCallbacks(currentStateValue, validatedStateValue);
  };

  return [{
    addUpdate: state.addUpdate,
    commitUpdates,
    rollbackUpdates: state.rollbackUpdates,
  }, {
    dispatch,
  }];
}
