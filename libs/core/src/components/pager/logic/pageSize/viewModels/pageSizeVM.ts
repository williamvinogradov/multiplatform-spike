import {IPagerPageSizeState, IPagerState} from '../../../state';
import {IPagerPageSizeVM} from './types';

function getPagerPageSizeSlice({pageSize}: IPagerState): IPagerPageSizeState {
  return pageSize;
}

function getPagerPageSizeVM({selected, sizes, templates}: IPagerPageSizeState): IPagerPageSizeVM {
  return {
    items: sizes.map((pageSize) => ({
      label: pageSize.toString(),
      value: pageSize,
      selectable: true,
      selected: pageSize === selected,
      template: templates.item,
    })),
    template: templates.general,
  }
}

export type {
  IPagerPageSizeVM,
}

export {
  getPagerPageSizeSlice,
  getPagerPageSizeVM,
}
