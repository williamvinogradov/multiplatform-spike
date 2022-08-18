import {ISimpleGridPaging} from '../../../../types/simpleGrid';

function filterData<TData>(data: TData[], paging?: ISimpleGridPaging): TData[] {
  if (!paging) {
    return data;
  }

  return data.slice(
    paging.selectedPageSize * (paging.selectedPage - 1),
    paging.selectedPageSize * paging.selectedPage);
}

export {
  filterData,
}
