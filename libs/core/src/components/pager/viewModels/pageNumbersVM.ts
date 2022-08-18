import {IPagerPageNumberState, IPagerState} from '../../../types/pager';
import {IPagerItem} from './types';

interface IPagerPageNumberVM {
  items: IPagerItem[];
}

const VISIBLE_PAGE_COUNT = 2;
const FAKE_ITEM_LABEL = '...';

function getPagerPageNumberSlice({selectedPage, pageCount}: IPagerState): IPagerPageNumberState {
  return {
    selectedPage,
    pageCount,
  }
}

function getFakePageItem(value: number): IPagerItem {
  return {
    label: FAKE_ITEM_LABEL,
    value,
    selectable: false,
    selected: false,
  }
}

function getPageItemsVmShort(selectedPage: number, pageCount: number): IPagerItem[] {
  const result: IPagerItem[] = [];

  for (let idx = 1; idx <= pageCount; idx++) {
    result.push({
      label: idx.toString(),
      value: idx,
      selectable: true,
      selected: idx === selectedPage
    });
  }

  return result;
}

function getPageItemsVmStart(selectedPage: number, pageCount: number): IPagerItem[] {
  const result: IPagerItem[] = [];

  for (let idx = 1; idx <= 2 * VISIBLE_PAGE_COUNT + 1 && idx <= pageCount; idx++) {
    result.push({
      label: idx.toString(),
      value: idx,
      selectable: true,
      selected: idx === selectedPage,
    });
  }

  result.push(getFakePageItem(pageCount - 1));
  result.push({
    label: pageCount.toString(),
    value: pageCount,
    selectable: true,
    selected: false,
  });

  return result;
}

function getPageItemsVmMiddle(selectedPage: number, pageCount: number): IPagerItem[] {
  const result: IPagerItem[] = [];

  result.push({
    label: '1',
    value: 1,
    selectable: true,
    selected: false,
  });
  result.push(getFakePageItem(2));

  for (let idx = selectedPage - VISIBLE_PAGE_COUNT; idx <= selectedPage + VISIBLE_PAGE_COUNT; idx++) {
    result.push({
      label: idx.toString(),
      value: idx,
      selectable: true,
      selected: idx === selectedPage,
    })
  }

  result.push(getFakePageItem(pageCount - 1));
  result.push({
    label: pageCount.toString(),
    value: pageCount,
    selectable: true,
    selected: false,
  });

  return result;
}

function getPageItemsVmEnd(selectedPage: number, pageCount: number): IPagerItem[] {
  const result: IPagerItem[] = [];

  result.push({
    label: '1',
    value: 1,
    selectable: true,
    selected: false,
  });
  result.push(getFakePageItem(2));

  for (let idx = pageCount - 2 * VISIBLE_PAGE_COUNT; idx <= pageCount; idx++) {
    result.push({
      label: idx.toString(),
      value: idx,
      selectable: true,
      selected: idx === selectedPage,
    });
  }

  return result;
}

function getPagerPageNumberVM({selectedPage, pageCount}: IPagerPageNumberState): IPagerPageNumberVM {
  let items: IPagerItem[] = [];
  if (pageCount <= 2 * VISIBLE_PAGE_COUNT + 1) {
    items = getPageItemsVmShort(selectedPage, pageCount);
  } else if (selectedPage <= 2 * VISIBLE_PAGE_COUNT) {
    items = getPageItemsVmStart(selectedPage, pageCount);
  } else if (selectedPage > pageCount - 2 * VISIBLE_PAGE_COUNT) {
    items = getPageItemsVmEnd(selectedPage, pageCount);
  } else {
    items = getPageItemsVmMiddle(selectedPage, pageCount);
  }

  return {
    items,
  }
}

export type {
  IPagerPageNumberVM,
}

export {
  getPagerPageNumberSlice,
  getPagerPageNumberVM,
}
