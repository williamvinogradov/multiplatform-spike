/* eslint-disable import/exports-last */
import {
  createCore,
  StateConfigMap,
  Handlers,
  StateManager,
  ViewModelManager,
  Dispatcher,
  Disposable,
  ViewModelValue,
  createViewModelValue,
} from '@devexpress/core';

// === props ===
export type ValueProps<T> = {
  value?: T;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ReadonlyProps = {};

// eslint-disable-next-line @typescript-eslint/ban-types
export type TemplateProps = {};

// === state ===
export type RadioGroupState<T> = ValueProps<T>;

// === actions ===

export enum Actions {
  updateValue = 'updateValue',
}

function updateValueHandler<T>(
  stateValue: RadioGroupState<T>,
  { value } : { value: T },
): Partial<RadioGroupState<T>> {
  return {
    ...stateValue,
    value,
  };
}

function createActionHandlers<T>(): Handlers<RadioGroupState<T>> {
  return {
    [Actions.updateValue]: updateValueHandler,
  };
}

// === selectors ===
interface RadioButtonViewMode {
  checked: boolean;
}

function radioValueSelector<T>(state: RadioGroupState<T>):
(radioButtonValue: T) => RadioButtonViewMode {
  return (radioButtonValue: T) => ({ checked: state.value === radioButtonValue });
}

// === component ===
export type RadioGroupStateManager<T> =
  StateManager<RadioGroupState<T>>;
export type RadioGroupViewModelManager<T> =
  // eslint-disable-next-line @typescript-eslint/ban-types
  Disposable<ViewModelManager<RadioGroupState<T>, {}>>;
export type RadioGroupDispatcher<T> =
  Dispatcher<RadioGroupState<T>, Handlers<RadioGroupState<T>>>;
export type RadioGroupCore<T> = {
  stateManager: RadioGroupStateManager<T>;
  radioButtonViewModel: ViewModelValue<(radioButtonValue: T) => RadioButtonViewMode>;
  dispatcher: RadioGroupDispatcher<T>,
};

export function createRadioGroupCore<T>(
  initialState: RadioGroupState<T>,
  stateConfig: StateConfigMap<RadioGroupState<T>>,
): RadioGroupCore<T> {
  const { stateManager, dispatcher } = createCore()(initialState,
    stateConfig,
    createActionHandlers<T>());
  const radioButtonViewModel = createViewModelValue(
    stateManager.getState(), stateManager.subscribe, radioValueSelector,
  );

  return {
    stateManager,
    radioButtonViewModel,
    dispatcher,
  };
}
