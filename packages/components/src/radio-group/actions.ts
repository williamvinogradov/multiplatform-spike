import { StateUpdateFunc } from '@devexpress/core';
import { RadioGroupState } from './state';

export function createUpdateValueAction<T>(value?: T): StateUpdateFunc<RadioGroupState<T>> {
  return () => ({ value });
}
