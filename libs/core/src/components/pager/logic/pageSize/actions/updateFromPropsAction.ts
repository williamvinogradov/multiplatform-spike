import {IPagerPageSizeState, IPagerState} from '../../../state';
import {TUpdateStateActionFunc, TUpdateStateActionResult} from '../../../../../common';

function normalizeState(state: IPagerState): TUpdateStateActionResult<IPagerState> {
  const selectedPageSizeNotExistInSizes = !state.pageSize.sizes.find((size) => size === state.pageSize.selected)

  return selectedPageSizeNotExistInSizes
    ? [{
      ...state,
      pageSize: {
        ...state.pageSize,
        selected: state.pageSize.sizes[0],
      }
    }, {emitOutputs: true}]
    : [state, {emitOutputs: false}];

}

function getNewState(state: IPagerState, pageSizeStatePart: Partial<IPagerPageSizeState>): IPagerState {
  return {
    ...state,
    pageSize: {
      ...state.pageSize,
      ...pageSizeStatePart,
    }
  }
}

function updateFromPropsAction(pageSizeStatePart: Partial<IPagerPageSizeState>, normalization: boolean): TUpdateStateActionFunc<IPagerState> {
  return (state) => {
    const newState = getNewState(state, pageSizeStatePart);

    return normalization ? normalizeState(newState) : [newState, {emitOutputs: false}];
  };
}

export {updateFromPropsAction};
