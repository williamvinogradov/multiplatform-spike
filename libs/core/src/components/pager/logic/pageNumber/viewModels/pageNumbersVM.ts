import {IPagerPageNumberState, IPagerState} from '../../../state';
import {IPagerItem} from '../../common/types';
import {IPagerPageNumberVM} from './types';

const VISIBLE_PAGE_COUNT = 2;
const FAKE_ITEM_LABEL = '...';

function getPagerPageNumberSlice({pageNumber}: IPagerState): IPagerPageNumberState {
  return pageNumber;
}

function getFakePageItem(value: number, fakeTemplate: unknown): IPagerItem {
  return {
    label: FAKE_ITEM_LABEL,
    value,
    selectable: false,
    selected: false,
    template: fakeTemplate,
  }
}

function getPageItemsVmShort(selectedPage: number, pageCount: number, template: unknown): IPagerItem[] {
  const result: IPagerItem[] = [];

  for (let idx = 1; idx <= pageCount; idx++) {
    result.push({
      label: idx.toString(),
      value: idx,
      selectable: true,
      selected: idx === selectedPage,
      template,
    });
  }

  return result;
}

function getPageItemsVmStart(
  selectedPage: number,
  pageCount: number,
  template: unknown,
  fakeTemplate: unknown
): IPagerItem[] {
  const result: IPagerItem[] = [];

  for (let idx = 1; idx <= 2 * VISIBLE_PAGE_COUNT + 1 && idx <= pageCount; idx++) {
    result.push({
      label: idx.toString(),
      value: idx,
      selectable: true,
      selected: idx === selectedPage,
      template,
    });
  }

  result.push(getFakePageItem(pageCount - 1, fakeTemplate));
  result.push({
    label: pageCount.toString(),
    value: pageCount,
    selectable: true,
    selected: false,
    template,
  });

  return result;
}

function getPageItemsVmMiddle(
  selectedPage: number,
  pageCount: number,
  template: unknown,
  fakeTemplate: unknown,
  ): IPagerItem[] {
  const result: IPagerItem[] = [];

  result.push({
    label: '1',
    value: 1,
    selectable: true,
    selected: false,
    template,
  });
  result.push(getFakePageItem(2, fakeTemplate));

  for (let idx = selectedPage - VISIBLE_PAGE_COUNT; idx <= selectedPage + VISIBLE_PAGE_COUNT; idx++) {
    result.push({
      label: idx.toString(),
      value: idx,
      selectable: true,
      selected: idx === selectedPage,
      template,
    })
  }

  result.push(getFakePageItem(pageCount - 1, fakeTemplate,));
  result.push({
    label: pageCount.toString(),
    value: pageCount,
    selectable: true,
    selected: false,
    template,
  });

  return result;
}

function getPageItemsVmEnd(
  selectedPage: number,
  pageCount: number,
  template: unknown,
  fakeTemplate: unknown,
): IPagerItem[] {
  const result: IPagerItem[] = [];

  result.push({
    label: '1',
    value: 1,
    selectable: true,
    selected: false,
    template,
  });
  result.push(getFakePageItem(2, fakeTemplate));

  for (let idx = pageCount - 2 * VISIBLE_PAGE_COUNT; idx <= pageCount; idx++) {
    result.push({
      label: idx.toString(),
      value: idx,
      selectable: true,
      selected: idx === selectedPage,
      template,
    });
  }

  return result;
}

function getPagerPageNumberVM({selected, count, templates}: IPagerPageNumberState): IPagerPageNumberVM {
  let items: IPagerItem[];
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
}

export type {
  IPagerPageNumberVM,
}

export {
  getPagerPageNumberSlice,
  getPagerPageNumberVM,
}
