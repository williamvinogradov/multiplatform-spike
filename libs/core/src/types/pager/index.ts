interface IPagerPageSizeState {
  selectedPageSize: number;
  pageSizes: number[];
}

interface IPagerPageNumberState {
  selectedPage: number;
  pageCount: number;
}

interface IPagerState extends IPagerPageSizeState, IPagerPageNumberState {}

interface IPagerOutputs {
  selectedPageChange: number;
  selectedPageSizeChange: number;
}

const PAGER_DEFAULT_PAGE_SIZED = [20, 40];

const PAGER_DEFAULT_STATE: IPagerState = {
  selectedPage: 1,
  selectedPageSize: PAGER_DEFAULT_PAGE_SIZED[0],
  pageCount: 1,
  pageSizes: PAGER_DEFAULT_PAGE_SIZED,
}

export type {
  IPagerPageSizeState,
  IPagerPageNumberState,
  IPagerState,
  IPagerOutputs,
}

export {
  PAGER_DEFAULT_STATE
}
