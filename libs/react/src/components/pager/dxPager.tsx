import React, {useEffect, useMemo} from 'react';
import {
  createPagerCore, ModelOptions
} from '@dx/core/components/pager';
import {useSecondEffect} from '../../internal';
import {useCallbackCollector} from '../../internal/hooks/useCallbackCollector';
import {pageNumberPropsToModel, pageSizePropsToModel, propsToDictionary} from './mappers';

import {DxPagerProps} from './types';
import {PagerContext} from './dxPagerContext';
import {DxPagerContainer} from './containers/dxPagerContainer';

import './dxPager.scss';


// TODO jQuery: export here for the inferno generator.
// TODO Vitik: React.memo isn't implemented for 'inferno'
//export const DxPager = React.memo(
//TODO Vitik: export 'const DxPager = ...' isn't supported by generator
//* Component={"name":"DxPager", "jQueryRegistered":true, "hasApiMethod":false}
export function DxPager(props: DxPagerProps) {
  const [isPageControlled, isSizeControlled] = useMemo(() => [
    props.defaultSelectedPage === undefined,
    props.defaultSelectedPageSize === undefined,
  ], []);
  const callbacks = useCallbackCollector<ModelOptions>(props);

  const [rootCore, containerCore] = useMemo(() =>
      createPagerCore(
        {
          model: {
            ...pageNumberPropsToModel(props, isPageControlled),
            ...pageSizePropsToModel(props, isSizeControlled),
          },
          dictionary: propsToDictionary(props),
        },
        {
          selectedPage: {
            isControlled: isPageControlled,
            // TODO Vinogradov
            publicCallback: (value: number) =>
              callbacks.current.selectedPageChange && callbacks.current.selectedPageChange(value),
          },
          selectedPageSize: {
            isControlled: isSizeControlled,
            // TODO Vinogradov
            publicCallback: (value: number) =>
              callbacks.current.selectedPageSizeChange && callbacks.current.selectedPageSizeChange(value),
          }
        }
      )
    , []);

  useSecondEffect(() => {
    isPageControlled && rootCore.updateState({model: pageNumberPropsToModel(props, true)});
    isSizeControlled && rootCore.updateState({model: pageSizePropsToModel(props, true)});
    rootCore.updateState({dictionary: propsToDictionary(props)});
    rootCore.completeUpdate();
  }, [props]);

  useEffect(() => () => {
    rootCore.destroy();
  }, []);

  return (
    <PagerContext.Provider value={containerCore}>
      <DxPagerContainer/>
    </PagerContext.Provider>
  )
}

//);

// TODO Vitik: required for component wrapper
DxPager.defaultProps = {
  selectedPage: 1,
  selectedPageSize: 10,
  pageCount: 20,
  pageSizes: [10, 20, 30],
};

