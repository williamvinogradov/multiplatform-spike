import {TUpdateStateActionFunc} from '../../../../../common';
import {IPagerState} from '../../../state';

function selectPageAction(selectedPage: number): TUpdateStateActionFunc<IPagerState> {
  return (state) => [{
      ...state,
      pageNumber: {
        ...state.pageNumber,
        selected: selectedPage,
      },
    }];
}

export {
  selectPageAction,
}
