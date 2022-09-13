import React, {useMemo} from 'react';
import {DxPagerCore, IPagerPageNumberVM, IPagerPageSizeVM} from '@dx/core/components/pager';
import {useViewModel} from '../../common/hooks';
import {useControlledPageNumber} from './hooks/useControlledPageNumber';
import {useControlledPageSize} from './hooks/useControlledPageSize';
import {useUncontrolledPageNumber} from './hooks/useUncontrolledPageNumber';
import {useUncontrolledPageSize} from './hooks/useUncontrolledPageSize';
import {useUpdateFromProps} from './hooks/useUpdateFromProps';
import {
  IDxPagerProps,
  IPagerPageNumberReactVM,
  IPagerPageSizeReactVM,
  PAGER_DEFAULT_PROPS,
  TPagerTemplate
} from './types';

import './dxPager.scss';

function DxPager(props: IDxPagerProps) {
  const isPageNumberControlled = props.selectedPage !== undefined;
  const isPageSizeControlled = props.selectedPageSize !== undefined;

  const component = useMemo(() => new DxPagerCore(), []);

  const rootTemplate = useViewModel<unknown, {template: TPagerTemplate}>(component.template$);
  const pageNumberViewModel = useViewModel<IPagerPageNumberVM, IPagerPageNumberReactVM>(component.pageNumberLogic.viewModel$);
  const pageSizeViewModel = useViewModel<IPagerPageSizeVM, IPagerPageSizeReactVM>(component.pageSizeLogic.viewModel$);

  useUpdateFromProps(component, props, isPageNumberControlled, isPageSizeControlled);

  const [selectPage] = isPageNumberControlled
    ? useControlledPageNumber(component, props)
    : useUncontrolledPageNumber(component, props);

  const [selectPageSize] = isPageSizeControlled
    ? useControlledPageSize(component, props)
    : useUncontrolledPageSize(component, props);


  const readyToRender = !!rootTemplate?.template && !!pageNumberViewModel && !!pageSizeViewModel;
  return readyToRender
    ? rootTemplate.template({
      pageNumberViewModel,
      pageSizeViewModel,
      selectPage,
      selectPageSize,
    })
    : null;
}

DxPager.defaultProps = PAGER_DEFAULT_PROPS;

export {
  IDxPagerProps,
  DxPager,
}
