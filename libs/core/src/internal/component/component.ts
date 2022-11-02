import {Action, ActionMap} from './reducer';
import {createReducer} from './reducer';
import {createState, StateValue} from './state';
import {modelCallbackMiddleware, modelChangesMiddleware, ModelPropertyConfigMap} from './modelMiddleware';
import {buildValidationChain, ValidationFunc} from './validation';
import {createViewModelMap, ViewModelFuncMap, ViewModelMap} from './viewModel';


interface RootCore<TModel extends {}, TDictionary extends {}> {
  updateState: (statePart: Partial<StateValue<Partial<TModel>, Partial<TDictionary>>>) => void;
  completeUpdate: (rollback?: boolean ) => void;
  destroy: () => void;
}

interface ContainerCore<TAction extends string, TViewModels> {
  viewModels: ViewModelMap<TViewModels>;
  dispatch: (action: Action<TAction>) => void;
}

const createCore = <TModel extends {}, TDictionary extends {}, TAction extends string, TViewModels>(
  initialStateValue: StateValue<TModel, TDictionary>,
  stateConfig: ModelPropertyConfigMap<TModel>,
  actionMap: ActionMap<TAction, TModel, TDictionary>,
  viewModelFuncMap: ViewModelFuncMap<StateValue<TModel, TDictionary>, TViewModels>,
  validation: ValidationFunc<StateValue<TModel, TDictionary>>[] = [],
): [RootCore<TModel, TDictionary>, ContainerCore<TAction, TViewModels>] => {
  const state = createState(initialStateValue);
  const reducer = createReducer(actionMap);
  const validator = buildValidationChain(validation);
  const [viewModels, unsubscribeArray] = createViewModelMap({
    getValue: state.getValue,
    subscribe: state.subscribe,
  }, viewModelFuncMap);

  // internal.
  const changeModel = (stateValue: StateValue<TModel, TDictionary>, forceEmit = false): void => {
    const currentModel = state.getValue().model;
    const validatedStateValue = validator(stateValue);
    const pendingCallbacks = modelCallbackMiddleware(currentModel, validatedStateValue.model, stateConfig);
    const [newModel, hasChanges] = modelChangesMiddleware(currentModel, validatedStateValue.model, stateConfig);

    if (hasChanges) {
      state.updatePart({ model: newModel });
      state.completeUpdate();
    }

    if (forceEmit || (!forceEmit && hasChanges)) {
      state.emit(state.getValue());
    }

    pendingCallbacks.forEach((callback) => callback());
  }

  // public.
  const completeUpdate = (rollback = false) => {
    state.completeUpdate(rollback);

    if (rollback) {
      return;
    }

    changeModel(state.getValue(), true);
  }

  const dispatch = (action: Action<TAction>) => {
    const currentStateValue = state.getValue();
    const newStateVersion = {
      ...currentStateValue,
      model: {
        ...currentStateValue.model,
        ...reducer(currentStateValue, action),
      }
    };

    changeModel(newStateVersion);
  }

  const destroy = () => {
    unsubscribeArray?.forEach((unsubscribe) => unsubscribe());
  };

  // init.
  changeModel(initialStateValue);

  return [
    {
      updateState: state.updatePart,
      completeUpdate,
      destroy,
    },
    {
      viewModels,
      dispatch,
    }
  ];
}

export type {RootCore, ContainerCore};
export {createCore};
