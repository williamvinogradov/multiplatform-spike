import {TUpdateStateActionFunc} from '../../../core';
import {IPagerState} from '../../../types/pager';

function selectPageSizeAction(pageSize: number): TUpdateStateActionFunc<IPagerState> {
  return (state) => [{
      ...state,
      selectedPageSize: pageSize
    }];
}

export {
  selectPageSizeAction,
}
