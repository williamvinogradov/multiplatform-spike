import {DxPagerCore} from '@dx/core/components/pager';
import {useCallback, useEffect} from 'react';
import {useOutput} from '../../../common/hooks';
import {IDxPagerProps} from '../types';

function useUncontrolledPageSize(
  component: DxPagerCore,
  props: IDxPagerProps,
) {
  useEffect(() => {
    component.pageSizeLogic.updateFromProps({
      selected: props.defaultSelectedPageSize,
    })
  }, []);

  useOutput(component.selectedPageSizeChangeOutput$, props.selectedPageSizeChange);

  const selectPageSize = useCallback((pageSize: number) =>
    () => component.pageSizeLogic.selectPageSize(pageSize), []);

  return [
    selectPageSize
  ];
}

export {useUncontrolledPageSize};
