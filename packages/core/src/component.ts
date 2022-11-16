import { callbacksMiddleware, controlledModeMiddleware, ModelConfigMap } from './middlewares';
import { createReducer, Handlers } from './reducer';
import { createState, StateValue } from './state';
import { ObjectType } from './utils';
import { pipe, PipeFunc } from './utils/pipe';

export interface RootCoreComponent<TModel extends ObjectType, TDictionary extends ObjectType> {
  addUpdate: (statePart: Partial<StateValue<Partial<TModel>, Partial<TDictionary>>>) => void;
  commitUpdates: () => void;
  rollbackUpdates: () => void;
  destroy: () => void;
}

export interface ContainerCoreComponent<
  TModel extends ObjectType,
  TDictionary extends ObjectType,
  THandlers extends Handlers<StateValue<TModel, TDictionary>>,
  > {
  // view models will be here.
  dispatch: <TAction extends keyof THandlers>(
    action: TAction,
    value: Parameters<THandlers[TAction]>[1],
  ) => void;
}

export type CreateCoreResult<
  TModel extends ObjectType,
  TDictionary extends ObjectType,
  THandlers extends Handlers<StateValue<TModel, TDictionary>>,
  > = [
    rootComponent: RootCoreComponent<TModel, TDictionary>,
    containerComponent: ContainerCoreComponent<TModel, TDictionary, THandlers>,
  ];

export function createCoreComponent<
  TModel extends ObjectType,
  TDictionary extends ObjectType,
  THandlers extends Handlers<StateValue<TModel, TDictionary>>,
  >(
  initialState: StateValue<TModel, TDictionary>,
  stateConfig: ModelConfigMap<TModel>,
  actionHandlers: THandlers,
  validation: PipeFunc<StateValue<TModel, TDictionary>>,
): CreateCoreResult<TModel, TDictionary, THandlers> {
  const state = createState(initialState);
  const reducer = createReducer<StateValue<TModel, TDictionary>>()(actionHandlers);
  const validator = pipe(validation);

  // view models will be here.

  // internal methods.
  const changeModel = (stateValue: StateValue<TModel, TDictionary>, forceEmit = false): void => {
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

    if (forceEmit || (!forceEmit && hasChanges)) {
      state.emit(state.getCurrent());
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

  const destroy = () => {
    // unsubscribe in view models will be here.
  };

  // return section.
  const rootComponent: RootCoreComponent<TModel, TDictionary> = {
    addUpdate: state.addUpdate,
    commitUpdates,
    rollbackUpdates: state.rollbackUpdates,
    destroy,
  };

  const containerComponent: ContainerCoreComponent<TModel, TDictionary, THandlers> = {
    dispatch,
  };

  return [
    rootComponent,
    containerComponent,
  ];
}
