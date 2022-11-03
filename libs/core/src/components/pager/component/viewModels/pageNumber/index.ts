import {
  getPageItemsVmEnd,
  getPageItemsVmMiddle,
  getPageItemsVmShort,
  getPageItemsVmStart
} from './helpers';
import {PagerState} from '../../state';
import {ItemVM, PageNumberVM} from '../types';
import {VISIBLE_PAGE_COUNT} from './consts';


type Params = [number, number, {
  general: unknown,
  item: unknown,
  fakeItem: unknown,
}];

const getPageNumberParams = (
  {
    model: {selectedPage},
    dictionary: {pageCount, pageNumberView, pageNumberItemView, pageNumberFakeItemView}
  }: PagerState
): Params => [
  selectedPage,
  pageCount,
  {
    general: pageNumberView,
    item: pageNumberItemView,
    fakeItem: pageNumberFakeItemView,
  }
];

const createPageNumberViewModel = (
  [selected, count, templates]: Params
): PageNumberVM => {
  let items: ItemVM[];
  if (count <= 2 * VISIBLE_PAGE_COUNT + 1) {
    items = getPageItemsVmShort(selected, count, templates.item);
  } else if (selected <= 2 * VISIBLE_PAGE_COUNT) {
    items = getPageItemsVmStart(selected, count, templates.item, templates.fakeItem);
  } else if (selected > count - 2 * VISIBLE_PAGE_COUNT) {
    items = getPageItemsVmEnd(selected, count, templates.item, templates.fakeItem);
  } else {
    items = getPageItemsVmMiddle(selected, count, templates.item, templates.fakeItem);
  }

  return {
    items,
    template: templates.general,
  }
};

export {
  getPageNumberParams,
  createPageNumberViewModel,
}
