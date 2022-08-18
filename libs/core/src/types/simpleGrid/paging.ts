interface ISimpleGridPaging {
  selectedPage: number;
  selectedPageSize: number;
  pageSizes: number[];
}

const SIMPLE_GRID_DEFAULT_PAGING: ISimpleGridPaging = {
  selectedPage: 1,
  selectedPageSize: 20,
  pageSizes: [20],
}

export type {
  ISimpleGridPaging
}

export {
  SIMPLE_GRID_DEFAULT_PAGING,
}
