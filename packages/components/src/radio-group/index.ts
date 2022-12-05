/* eslint-disable import/exports-last */
import {
  createCore,
  StateConfigMap,
  Handlers,
  StateManager,
  ViewModelManager,
  Dispatcher,
  Disposable,
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
interface RadioButtonViewModel {
  checked: boolean;
}

function radioValueSelector<T>(state: RadioGroupState<T>):
(radioButtonValue: T) => RadioButtonViewModel {
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

export type RadioGroupViewModel<T> = {
  radioButtonViewModel: (radioButtonValue: T) => RadioButtonViewModel
};
export type RadioGroupCore<T> = {
  stateManager: RadioGroupStateManager<T>;
  viewModelManager: ViewModelManager<RadioGroupState<T>, RadioGroupViewModel<T>>;
  dispatcher: RadioGroupDispatcher<T>,
};

export function createRadioGroupCore<T>(
  initialState: RadioGroupState<T>,
  stateConfig: StateConfigMap<RadioGroupState<T>>,
): RadioGroupCore<T> {
  const { stateManager, dispatcher, viewModelManager } = createCore<RadioGroupViewModel<T>>()(
    initialState,
    stateConfig,
    createActionHandlers<T>(),
  );
  viewModelManager.add({ radioButtonViewModel: radioValueSelector });
  return {
    stateManager,
    viewModelManager,
    dispatcher,
  };
}
