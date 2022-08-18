import {TUpdateStateActionFunc} from '../../../core';
import {ISimpleGridInputs, ISimpleGridState} from '../../../types/simpleGrid';

function updateStateFromPropsAction<TData>(props: Partial<ISimpleGridInputs<TData>>)
 : TUpdateStateActionFunc<ISimpleGridState<TData>> {
  return (state) => [{
    ...state,
    ...props,
  }, { emitOutputs: false }]
}

export {
  updateStateFromPropsAction,
}
