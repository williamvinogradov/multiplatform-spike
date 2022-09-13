import {TUpdateStateActionFunc} from '../../../../../common';
import {IPagerState} from '../../../state';

function selectPageSizeAction(pageSize: number): TUpdateStateActionFunc<IPagerState> {
  return (state) => [{
      ...state,
      pageSize: {
        ...state.pageSize,
        selected: pageSize,
      }
    }];
}

export {
  selectPageSizeAction,
}
