import {TUpdateStateActionFunc} from '../../../common';
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
