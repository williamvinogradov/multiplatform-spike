import {TUpdateStateActionFunc} from '../../../core';
import {ISlideToggleState} from '../../../types/slideToggle';

function updateStateFromPropsAction(props: Partial<ISlideToggleState>): TUpdateStateActionFunc<ISlideToggleState> {
  return (state) => [{
    ...state,
    ...props,
  }, { emitOutputs: false }];
}

export {
  updateStateFromPropsAction,
}
