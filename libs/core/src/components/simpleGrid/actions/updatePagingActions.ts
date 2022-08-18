import {TUpdateStateActionFunc} from '../../../core';
import {ISimpleGridPaging, ISimpleGridState, SIMPLE_GRID_DEFAULT_PAGING} from '../../../types/simpleGrid';

function updatePagingActions<TData>(
  paging: Partial<ISimpleGridPaging>
): TUpdateStateActionFunc<ISimpleGridState<TData>> {
  return (state) => [{
    ...state,
    paging: {
      ...SIMPLE_GRID_DEFAULT_PAGING,
      ...state.paging,
      ...paging,
    }
  }];
}

export {
  updatePagingActions,
}
