import {DxPagerCore} from '@dx/core/components/pager';
import {useCallback, useEffect} from 'react';
import {IDxPagerProps} from '../types';

function useControlledPageNumber(
  component: DxPagerCore,
  props: IDxPagerProps,
) {
  useEffect(() => {
    component.pageNumberLogic.updateFromProps({
      selected: props.selectedPage
    }, false);
  }, [props.selectedPage]);

  const selectPage = useCallback(
    (pageNumber: number) =>
      () => props.selectedPageChange && props.selectedPageChange(pageNumber), [props.selectedPageChange]);

  return [
    selectPage
  ];
}

export {useControlledPageNumber};
