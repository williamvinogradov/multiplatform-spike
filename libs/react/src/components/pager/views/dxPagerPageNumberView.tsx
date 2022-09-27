import React from 'react';
import {IPagerPageNumberReactVM} from '../types';

interface IDxPagerPageNumberViewProps {
  viewModel: IPagerPageNumberReactVM;
  selectPage: (pageNumber: number) => () => void;
}

function DxPagerPageNumberView({viewModel, selectPage}: IDxPagerPageNumberViewProps) {
  return (
    <div className="dx-pager-pages">
      {
        viewModel.items.map((item) =>
          item.template({item, data: { item, selectPage }, selectPage})
        )
      }
    </div>
  )
}

export type {IDxPagerPageNumberViewProps};
export {DxPagerPageNumberView};
