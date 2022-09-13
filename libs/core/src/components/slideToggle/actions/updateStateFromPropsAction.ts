import {TUpdateStateActionFunc} from '../../../common';
import {ISlideToggleState} from '../state';


function updateStateFromPropsAction(statePart: Partial<ISlideToggleState>): TUpdateStateActionFunc<ISlideToggleState> {
  return (state) => [{
    ...state,
    ...statePart,
  }, { emitOutputs: false }];
}

export {
  updateStateFromPropsAction,
}
