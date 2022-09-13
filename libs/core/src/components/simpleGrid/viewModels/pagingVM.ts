import {IPagerState} from '../../../types/pager';
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
      selectedPageSize: 1,
      selectedPage: 1,
      pageSizes: [20, 40],
      pageCount: 1,
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
