import {DxPagerLogic, DxPagerOutputs, PagerState} from '@dx/core/components/pager';
import React, {useCallback, useEffect, useMemo} from 'react';
import {useOutput, useViewModel} from '../../common/hooks';
import {IDxPagerProps} from './dxPagerProps';

import './dxPager.scss';

function DxPager(props: IDxPagerProps) {
  const state = useMemo(() => new PagerState(), []);
  const logic = useMemo(() => new DxPagerLogic(state), []);
  const outputs = useMemo(() => new DxPagerOutputs(state), []);

  const pageSizeVM = useViewModel(logic.pageSizeVM$);
  const pageNumberVM = useViewModel(logic.pageNumberVM$);


  useEffect(() => logic.updateStateFromPropsAction(props), [props]);
  useOutput(outputs.outputs$.selectedPageChange, props.selectedPageChange);
  useOutput(outputs.outputs$.selectedPageSizeChange, props.selectedPageSizeChange);

  const selectPage = useCallback((selectedPage: number) => () => logic.selectPageAction(selectedPage), []);
  const selectPageSize = useCallback((selectedPageSize: number) => () => logic.selectPageSizeAction(selectedPageSize), []);

  return (
    <div className="dx-pager">
      <div className="dx-pager-page-size">
        {
          pageSizeVM && pageSizeVM.items.map((pageSizeItem) => {
            return <div key={pageSizeItem.value}
                        className={`dx-pager-page-size__item ${pageSizeItem.selected ? '-selected' : ''}`}
                        onClick={selectPageSize(pageSizeItem.value)}>
              {pageSizeItem.label}
            </div>
          })
        }
      </div>
      <div className="dx-pager-pages">
        {
          pageNumberVM && pageNumberVM.items.map((pageItem) => {
            return <div key={pageItem.value}
                        className={`dx-pager-pages__item 
                        ${pageItem.selectable ? '-selectable' : ''}
                        ${pageItem.selected ? '-selected' : ''}`}
                        onClick={selectPage(pageItem.value)}>
              {pageItem.label}
            </div>
          })
        }
      </div>
    </div>
  )
}

export {
  IDxPagerProps,
  DxPager,
}
