import {TUpdateStateActionFunc} from '../../../common';
import {ISimpleGridPaging, ISimpleGridState, SIMPLE_GRID_DEFAULT_PAGING} from '../../../types/simpleGrid';

function updateStateFromPagingPropsAction<TData>(
  props: Partial<ISimpleGridPaging>
): TUpdateStateActionFunc<ISimpleGridState<TData>> {
  return (state) => [{
    ...state,
    paging: {
      ...SIMPLE_GRID_DEFAULT_PAGING,
      ...state.paging,
      ...props,
    }
  }, { emitOutputs: false }];
}

export {
  updateStateFromPagingPropsAction,
}
