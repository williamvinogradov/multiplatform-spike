import React from 'react';
import {IPagerPageSizeReactVM} from '../types';

interface IDxPagerPageSizeViewProps {
  viewModel: IPagerPageSizeReactVM;
  selectPageSize: (pageSize: number) => () => void;
}


function DxPagerPageSizeView({viewModel, selectPageSize}: IDxPagerPageSizeViewProps) {
  return (
    <div className="dx-pager-page-size">
      {
        viewModel.items.map((item) =>
          item.template({item, selectPageSize}))
      }
    </div>
  );
}

export type {IDxPagerPageSizeViewProps};
export {DxPagerPageSizeView};
