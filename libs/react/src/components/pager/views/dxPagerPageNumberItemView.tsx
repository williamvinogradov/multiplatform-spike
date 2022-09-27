import React from 'react';
import {IPagerPageNumberItemReact} from '../types';

interface IDxPagerPageNumberItemViewProps {
  item: IPagerPageNumberItemReact;
  data: { item: IPagerPageNumberItemReact, selectPage: (pageNumber: number) => () => void };

  selectPage: (pageNumber: number) => () => void;
}

function DxPagerPageNumberItemView({item, selectPage}: IDxPagerPageNumberItemViewProps) {
  return (
    <div key={item.value}
         className={`dx-pager-pages__item 
                        ${item.selectable ? '-selectable' : ''}
                        ${item.selected ? '-selected' : ''}`}
         onClick={selectPage(item.value)}>
      {item.label}
    </div>
  )
}

export type {IDxPagerPageNumberItemViewProps};
export {DxPagerPageNumberItemView};
