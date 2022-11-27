import { StateUpdateFunc } from '@devexpress/core';
import { RadioGroupState } from './state';

export function updateValueAction<T>(value?: T): StateUpdateFunc<RadioGroupState<T>> {
  return () => ({ value });
}
