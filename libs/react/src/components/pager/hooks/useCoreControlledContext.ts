import {createPagerStore, PagerStore} from '@dx/core/components/pager';
import {useMemo} from 'react';
import {PagerContextType} from '../dxPagerContext';
import {DxPagerProps} from '../types/public';
import {
  propsToContracts,
  selectedPageChangeControlled,
  selectedPageSizeChangeControlled,
} from '../utils';

const useCoreControlledContext = (
  props: DxPagerProps
): [PagerStore, PagerContextType] => {
  const store = useMemo(() => {
    const contracts = propsToContracts(props, true, true);
    return createPagerStore(contracts);
  }, []);

  const selectPageCallback = useMemo(
    () => selectedPageChangeControlled(props),
    [props.selectedPageChange]
  );
  const selectPageSizeCallback = useMemo(
    () => selectedPageSizeChangeControlled(props),
    [props.selectedPageSizeChange]
  );

  const context: PagerContextType = useMemo(() => [
    store, {
      selectedPageChange: selectPageCallback,
      selectedPageSizeChange: selectPageSizeCallback,
    }
  ], [selectPageCallback, selectPageSizeCallback]);

  return [store, context];
}

export {useCoreControlledContext};
