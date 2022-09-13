interface IPagerPageNumberTemplateState {
  general: unknown;
  item: unknown;
  fakeItem: unknown;
}

interface IPagerPageNumberState {
  selected: number;
  count: number;
  templates: IPagerPageNumberTemplateState;
}

interface IPagerPageSizeTemplateState {
  general: unknown;
  item: unknown;
}

interface IPagerPageSizeState {
  selected: number;
  sizes: number[];
  templates: IPagerPageSizeTemplateState;
}

interface IPagerState {
  pageNumber: IPagerPageNumberState;
  pageSize: IPagerPageSizeState;
  pagerTemplate: unknown;
}

const PAGER_DEFAULT_PAGE_SIZES = [20, 40];

const PAGER_DEFAULT_STATE: IPagerState = {
  pageNumber: {
    selected: 1,
    count: 1,
    templates: {
      general: undefined,
      item: undefined,
      fakeItem: undefined,
    }
  },
  pageSize: {
    selected: PAGER_DEFAULT_PAGE_SIZES[0],
    sizes: PAGER_DEFAULT_PAGE_SIZES,
    templates: {
      general: undefined,
      item: undefined,
    }
  },
  pagerTemplate: undefined,
}

export type {
  IPagerPageSizeState,
  IPagerPageNumberState,
  IPagerState,
  IPagerPageNumberTemplateState,
  IPagerPageSizeTemplateState
}

export {
  PAGER_DEFAULT_PAGE_SIZES,
  PAGER_DEFAULT_STATE,
}
