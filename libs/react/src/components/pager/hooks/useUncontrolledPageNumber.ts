import {DxPagerCore} from '@dx/core/components/pager';
import {useCallback, useEffect} from 'react';
import {useOutput} from '../../../common/hooks';
import {IDxPagerProps} from '../types';

function useUncontrolledPageNumber(
  component: DxPagerCore,
  props: IDxPagerProps,
) {
  useEffect(() => {
    component.pageNumberLogic.updateFromProps({
      selected: props.defaultSelectedPage
    });
  }, []);

  useOutput(component.selectedPageChangeOutput$, props.selectedPageChange);

  const selectPage = useCallback((pageNumber: number) =>
    () => component.pageNumberLogic.selectPageAction(pageNumber), []);

  return [
    selectPage
  ];
}

export {useUncontrolledPageNumber};
