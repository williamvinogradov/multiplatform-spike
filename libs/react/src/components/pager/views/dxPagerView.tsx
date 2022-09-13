import React from 'react';
import {IPagerPageNumberReactVM, IPagerPageSizeReactVM} from '../types';

interface IDxPagerViewProps {
  pageSizeViewModel: IPagerPageSizeReactVM;
  pageNumberViewModel: IPagerPageNumberReactVM;
  selectPage: (pageNumber: number) => () => void;
  selectPageSize: (pageSize: number) => () => void;
}

function DxPagerView(props: IDxPagerViewProps) {
  const pageSizeView = props.pageSizeViewModel.template;
  const pageNumberView = props.pageNumberViewModel.template;

  return (
    <div className="dx-pager">
      {
        pageSizeView({
          viewModel: props.pageSizeViewModel,
          selectPageSize: props.selectPageSize,
        })
      }
      {
        pageNumberView({
          viewModel: props.pageNumberViewModel,
          selectPage: props.selectPage,
        })
      }
    </div>
  )
}

export {IDxPagerViewProps};
export {DxPagerView};
