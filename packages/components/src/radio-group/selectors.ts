import { Selector } from '@devexpress/core';
import { RadioGroupState } from './state';

export type RadioButtonVM = {
  selected: boolean;
};

export function createRadioButtonVMSelector<T>(
  value: T,
): Selector<RadioGroupState<T>, RadioButtonVM> {
  return (state) => ({
    selected: state.value === value,
  });
}
