import {IPagerPageSizeState, IPagerState} from '../../../types/pager';
import {IPagerItem} from './types';

interface IPagerPageSizeVM {
  items: IPagerItem[];
}

function getPagerPageSizeSlice({selectedPageSize, pageSizes}: IPagerState): IPagerPageSizeState {
  return {
    selectedPageSize,
    pageSizes,
  }
}

function getPagerPageSizeVM({selectedPageSize, pageSizes}: IPagerPageSizeState): IPagerPageSizeVM {
  return {
    items: pageSizes.map((pageSize) => ({
      label: pageSize.toString(),
      value: pageSize,
      selectable: true,
      selected: pageSize === selectedPageSize,
    }))
  }
}

export type {
  IPagerPageSizeVM,
}

export {
  getPagerPageSizeSlice,
  getPagerPageSizeVM,
}
