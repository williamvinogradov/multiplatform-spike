import React from 'react';
import {
  UpdateFromContractsAction
} from '@dx/core/components/pager';
import {useSecondEffect} from '../../internal';
import {useIsControlled, useCoreControlledContext, useCoreUncontrolledContext} from './hooks';
import {DxPagerProps} from './types/public';
import {
  propsToContracts,
} from './utils';
import {PagerContext} from './dxPagerContext';
import {DxPagerContainer} from './containers/dxPagerContainer';

import './dxPager.scss';


// TODO jQuery: export here for the inferno generator.
//* Component={"name":"DxPager", "jQueryRegistered":true, "hasApiMethod":false}
export const DxPager = React.memo((props: DxPagerProps) => {
  const isControlled = useIsControlled(props);
  const [store, context] = isControlled
    ? useCoreControlledContext(props)
    : useCoreUncontrolledContext(props);

  /* update from contracts */
  const contracts = propsToContracts(props, false, isControlled);
  useSecondEffect(() => {
    store.dispatch(new UpdateFromContractsAction(contracts));
  }, [props]);

  return (
    <PagerContext.Provider value={context}>
      <DxPagerContainer/>
    </PagerContext.Provider>
  )
});
