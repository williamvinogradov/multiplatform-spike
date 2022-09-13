import {TUpdateStateActionFunc} from '../../../common';
import {ISlideToggleState} from '../state';


function updateValueAction(value: boolean): TUpdateStateActionFunc<ISlideToggleState> {
  return (state) => [{
    ...state,
    value,
  }];
}

export {
  updateValueAction,
}
