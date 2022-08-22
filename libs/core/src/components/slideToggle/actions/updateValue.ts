import {TUpdateStateActionFunc} from '../../../common';
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
