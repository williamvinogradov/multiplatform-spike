import _extends from "@babel/runtime/helpers/esm/extends";
import { useMemo, InfernoWrapperComponent } from '@devextreme/runtime/inferno-hooks';

import { createVNode, createComponentVNode } from "inferno";
import { DxPagerCore } from '@dx/core/components/pager';
import { useViewModel } from '../../common/hooks';
import { useControlledPageNumber } from './hooks/useControlledPageNumber';
import { useControlledPageSize } from './hooks/useControlledPageSize';
import { useUncontrolledPageNumber } from './hooks/useUncontrolledPageNumber';
import { useUncontrolledPageSize } from './hooks/useUncontrolledPageSize';
import { useUpdateFromProps } from './hooks/useUpdateFromProps';
import { IDxPagerProps, PAGER_DEFAULT_PROPS } from './types';
import './dxPager.scss';

function DxPager(props) {
  var isPageNumberControlled = props.selectedPage !== undefined;
  var isPageSizeControlled = props.selectedPageSize !== undefined;
  var component = useMemo(() => new DxPagerCore(), []);
  var rootTemplate = useViewModel(component.template$);
  var pageNumberViewModel = useViewModel(component.pageNumberLogic.viewModel$);
  var pageSizeViewModel = useViewModel(component.pageSizeLogic.viewModel$);
  useUpdateFromProps(component, props, isPageNumberControlled, isPageSizeControlled);
  var [selectPage] = isPageNumberControlled ? useControlledPageNumber(component, props) : useUncontrolledPageNumber(component, props);
  var [selectPageSize] = isPageSizeControlled ? useControlledPageSize(component, props) : useUncontrolledPageSize(component, props);
  var readyToRender = !!(rootTemplate !== null && rootTemplate !== void 0 && rootTemplate.template) && !!pageNumberViewModel && !!pageSizeViewModel;
  var viewModel = {
    pageNumberViewModel,
    pageSizeViewModel,
    selectPage,
    selectPageSize
  };
  return readyToRender ? rootTemplate.template(_extends({}, viewModel, {
    data: viewModel
  })) : createVNode(1, "div");
}

function HooksDxPager(props) {
  return createComponentVNode(2, InfernoWrapperComponent, {
    "renderFn": DxPager,
    "renderProps": props
  });
}

export { HooksDxPager as DxPager };
HooksDxPager.defaultProps = PAGER_DEFAULT_PROPS;
export { IDxPagerProps };