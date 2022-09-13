import {DxPagerCore} from '@dx/core/components/pager';
import {useCallback, useEffect} from 'react';
import {IDxPagerProps} from '../types';

function useControlledPageSize(
  component: DxPagerCore,
  props: IDxPagerProps,
) {
  useEffect(() => {
    component.pageSizeLogic.updateFromProps({
      selected: props.selectedPageSize
    }, false);
  }, [props.selectedPageSize]);

  const selectPageSize = useCallback((pageSize: number) =>
    () => props.selectedPageSizeChange && props.selectedPageSizeChange(pageSize), [props.selectedPageSizeChange]);

  return [
    selectPageSize
  ];
}

export {useControlledPageSize};
