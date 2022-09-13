import React from 'react';
import {IPagerPageSizeItemReact} from '../types';

interface IDxPagerPageSizeItemViewProps {
  item: IPagerPageSizeItemReact;
  selectPageSize: (pageSize: number) => () => void;
}

function DxPagerPageSizeItemView({item, selectPageSize}: IDxPagerPageSizeItemViewProps) {
  return (
    <div key={item.value}
         className={`dx-pager-page-size__item ${item.selected ? '-selected' : ''}`}
         onClick={selectPageSize(item.value)}>
      {item.label}
    </div>
  )
}

export type {IDxPagerPageSizeItemViewProps};
export {DxPagerPageSizeItemView};
