import {IPagerState, PAGER_DEFAULT_STATE} from '../../../types/pager';
import {ISimpleGridPaging, ISimpleGridState} from '../../../types/simpleGrid';

interface ISimpleGridPagingSlice {
  dataLength: number;
  paging?: ISimpleGridPaging,
}

interface ISimpleGridPagingVM extends IPagerState {}


function getSimpleGridPagingSlice<TData>(state: ISimpleGridState<TData>): ISimpleGridPagingSlice {
  return {
    dataLength: state.data.length,
    paging: state.paging,
  }
}

function getSimpleGridPagingVM({dataLength, paging}: ISimpleGridPagingSlice): ISimpleGridPagingVM {
  if (!paging) {
    return {
      ...PAGER_DEFAULT_STATE,
    };
  }

  return {
    pageCount: Math.ceil(dataLength / paging.selectedPageSize),
    ...paging,
  }
}

export type {
  ISimpleGridPagingVM,
}

export {
  getSimpleGridPagingSlice,
  getSimpleGridPagingVM,
}
