import { createStore, StateConfigMap, Store } from '@devexpress/core';
import { RadioGroupState } from './state';

export function createRadioGroupStore<T>(
  initialState: RadioGroupState<T>,
  config: StateConfigMap<RadioGroupState<T>>,
): Store<RadioGroupState<T>> {
  return createStore(initialState, config);
}
