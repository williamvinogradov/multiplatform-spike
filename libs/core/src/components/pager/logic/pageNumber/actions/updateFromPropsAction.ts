import {IPagerPageNumberState, IPagerState} from '../../../state';
import {TUpdateStateActionFunc, TUpdateStateActionResult} from '../../../../../common';

function normalizeState(state: IPagerState): TUpdateStateActionResult<IPagerState> {
  const selectedPage = state.pageNumber.selected ?? state.pageNumber.selected;
  const pageCount = state.pageNumber.count ?? state.pageNumber.count;

  if (selectedPage > pageCount) {
    return [{
      ...state,
      pageNumber: {
        ...state.pageNumber,
        selected: 1,
      }
    }, {emitOutputs: true}];
  }

  return [state, {emitOutputs: false}];
}

function getNewState(state: IPagerState, pageNumberStatePart: Partial<IPagerPageNumberState>): IPagerState {
  return {
    ...state,
    pageNumber: {
      ...state.pageNumber,
      ...pageNumberStatePart,
    }
  };
}

function updateFromPropsAction(pageNumberStatePart: Partial<IPagerPageNumberState>, normalization: boolean): TUpdateStateActionFunc<IPagerState> {
  return (state) => {
    const newState = getNewState(state, pageNumberStatePart);
    return normalization ? normalizeState(newState) : [newState, {emitOutputs: false}];
  };
}

export {updateFromPropsAction}
