import React from 'react';
import {
  SlideToggleContractConfigs,
  SlideToggleContractModels,
  SlideToggleContractTemplates,
  UpdateFromContractsAction,
} from '@dx/core/components/slideToggle';
import {
  useSecondEffect,
  ReactContracts,
} from '../../internal';
import {DxSlideToggleContainer} from './containers/dxSlideToggleContainer';
import {SlideToggleContext} from './dxSlideToggleContext';
import {useCoreContext, useIsControlled} from './hooks';
import {
  propsToContracts,
  ViewTemplate,
} from './utils';

import {
  DxSlideToggleIndicatorViewProps,
  DxSlideToggleTextViewProps,
} from './views';

/** @public */
export type IndicatorViewTemplate = ViewTemplate<DxSlideToggleIndicatorViewProps>;

/** @public */
export type TextViewTemplate = ViewTemplate<DxSlideToggleTextViewProps>;

/** @public */
export type DxSlideToggleProps = ReactContracts<
  SlideToggleContractModels,
  SlideToggleContractConfigs,
  SlideToggleContractTemplates
> & {
  indicatorView?: IndicatorViewTemplate;
  textView?: TextViewTemplate;
}

// TODO jQuery: export here for the inferno generator.
export const DxSlideToggle = React.memo((props: DxSlideToggleProps) => {
  const isControlled = useIsControlled(props);
  const [store, context] = useCoreContext(props, isControlled);

  /* update state from contracts */
  const contracts = propsToContracts(props, false, isControlled);
  useSecondEffect(() => {
    store.dispatch(new UpdateFromContractsAction(contracts));
  }, [contracts]);

  return (
    <SlideToggleContext.Provider value={context}>
      <DxSlideToggleContainer/>
    </SlideToggleContext.Provider>
  )
});
