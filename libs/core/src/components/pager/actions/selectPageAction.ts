import {TUpdateStateActionFunc} from '../../../core';
import {IPagerState} from '../../../types/pager';

function selectPageAction(selectedPage: number): TUpdateStateActionFunc<IPagerState> {
  return (state) => [{
      ...state,
      selectedPage,
    }];
}

export {
  selectPageAction,
}
