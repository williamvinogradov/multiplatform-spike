import {TUpdateStateActionFunc} from '../../../core';
import {ISlideToggleState} from '../../../types/slideToggle';

function updateValueAction(value: boolean): TUpdateStateActionFunc<ISlideToggleState> {
  return (state) => [{
    ...state,
    value,
  }];
}

export {
  updateValueAction,
}
