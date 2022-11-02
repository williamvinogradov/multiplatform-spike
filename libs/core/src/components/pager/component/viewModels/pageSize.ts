import {PagerState} from '../state';
import {PageSizeVM} from './types';


type Params = [number, readonly number[], {general: unknown, item: unknown}];

const getPageSizeParams = (
  {model: {selectedPageSize}, dictionary: {pageSizes, pageSizeView, pageSizeItemView}}: PagerState
): Params => {
  return [selectedPageSize, pageSizes, { general: pageSizeView, item: pageSizeItemView}];
}

const createPageSizeViewModel = (
  [selected, sizes, templates]: Params,
): PageSizeVM => ({
  items: sizes.map((pageSize) => ({
    label: pageSize.toString(),
    value: pageSize,
    selectable: true,
    selected: pageSize === selected,
    template: templates.item,
  })),
  template: templates.general,
});

export {getPageSizeParams, createPageSizeViewModel};
