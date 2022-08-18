import {TUpdateStateActionFunc} from '../../../core';
import {IPagerState} from '../../../types/pager';

function updateStateFromPropsAction(props: Partial<IPagerState>): TUpdateStateActionFunc<IPagerState> {
  return (state) => {
    const newState = {
      ...state,
      ...props,
    };

    if (newState.selectedPage > newState.pageCount) {
      return [{...newState, selectedPage: 1}, { emitOutputs: true }];
    }

    return [newState, { emitOutputs: false }];
  }
}

export {
  updateStateFromPropsAction,
}
