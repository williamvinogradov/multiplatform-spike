import React from 'react';
import {
  DxPager,
  IDxPagerPageSizeItemViewProps,
  IDxPagerPageNumberItemViewProps,
  IDxPagerPageSizeViewProps,
  IDxPagerPageNumberViewProps,
  DxPagerPageNumberItemView,
  DxPagerPageSizeItemView,
  IDxPagerViewProps,
  DxPagerPageSizeView,
  DxPagerPageNumberView
} from '@dx/react/components/pager';

import './customizationExample.css';

// --- custom template section ---

function CustomPageSizeItem({item, selectPageSize}: IDxPagerPageSizeItemViewProps) {
  return (
    <div className={`custom-pager-item ${item.selected ? '--selected' : ''}`}
         key={item.value}
         onClick={selectPageSize(item.value)}>
      {item.label}
    </div>
  );
}

function CustomPageNumberItem({item, selectPage}: IDxPagerPageNumberItemViewProps) {
  return (
    <div className={`custom-pager-item ${item.selected ? '--selected' : ''}`}
         key={item.value}
         onClick={selectPage(item.value)}>
      {item.label}
    </div>
  );
}

function CustomPageNumberDivider({item}: IDxPagerPageNumberItemViewProps) {
  return (
    <div className="custom-pager-item divider"
         key={item.value}>
      <div className="divider__line">
      </div>
    </div>
  )
}

function CustomPageSize({viewModel, selectPageSize}: IDxPagerPageSizeViewProps) {
  return (
    <div className="custom-pager-sizes">
      {
        viewModel.items.map((item) =>
          <DxPagerPageSizeItemView key={item.value} item={item} selectPageSize={selectPageSize} />
        )
      }
    </div>
  )
}

function CustomPageNumber({viewModel, selectPage}: IDxPagerPageNumberViewProps) {
  return (
    <div className="custom-pager-numbers">
      <div className="custom-pager-numbers__content">
        {
          viewModel.items.map((item) =>
            <DxPagerPageNumberItemView key={item.value} item={item} selectPage={selectPage} />
          )
        }
      </div>
    </div>
  )
}

function CustomPager({pageSizeViewModel, pageNumberViewModel, selectPage, selectPageSize}: IDxPagerViewProps) {
  return (
    <div className="custom-pager">
      <div className="custom-pager__item">
        <DxPagerPageNumberView viewModel={pageNumberViewModel} selectPage={selectPage} />
      </div>
      <div className="custom-pager__item">
        <DxPagerPageSizeView viewModel={pageSizeViewModel} selectPageSize={selectPageSize} />
      </div>
    </div>
  )
}

// -- example component ---

function CustomizationExample() {
  return (
    <React.Fragment>
      <div className="example">
        <div className="example__title">
          Customization items example
        </div>
        <div className="example__control">
          <DxPager defaultSelectedPage={1}
                   defaultSelectedPageSize={20}
                   pageCount={20}
                   pageSizes={[10, 20, 30]}
                   pageNumberItemTemplate={CustomPageNumberItem}
                   pageNumberFakeItemTemplate={CustomPageNumberDivider}
                   pageSizeItemTemplate={CustomPageSizeItem}
          />
        </div>
      </div>

      <div className="example">
        <div className="example__title">
          Customization reuse default templates example
        </div>
        <div className="example__control">
          <DxPager defaultSelectedPage={1}
                   defaultSelectedPageSize={20}
                   pageCount={20}
                   pageSizes={[10, 20, 30]}
                   pageNumberTemplate={CustomPageNumber}
                   pageSizeTemplate={CustomPageSize}
          />
        </div>
      </div>

      <div className="example">
        <div className="example__title">
          Customization main template example
        </div>
        <div className="example__control">
          <DxPager defaultSelectedPage={1}
                   defaultSelectedPageSize={20}
                   pageCount={20}
                   pageSizes={[10, 20, 30]}
                   pagerTemplate={CustomPager}
                   pageNumberItemTemplate={CustomPageNumberItem}
                   pageNumberFakeItemTemplate={CustomPageNumberDivider}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export {CustomizationExample};
