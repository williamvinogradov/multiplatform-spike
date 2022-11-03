import React, {useEffect, useMemo} from 'react';
import {useSecondEffect} from '../../internal';
import {useCallbackCollector} from '../../internal/hooks/useCallbackCollector';
import {DxSlideToggleContainer} from './containers/dxSlideToggleContainer';
import {SlideToggleContext} from './dxSlideToggleContext';
import {propsToDictionary, propsToModel} from './mappers';
import {DxSlideToggleProps} from './types';

import {createSlideToggleCore, ModelOptions} from '@dx/core/components/slideToggle';


// TODO jQuery: export here for the inferno generator.
export const DxSlideToggle = React.memo((props: DxSlideToggleProps) => {
  const isControlled = useMemo(() => props.defaultValue === undefined, []);
  const callbacks = useCallbackCollector<ModelOptions>(props);

  const [rootCore, containerCore] = useMemo(() => createSlideToggleCore(
    {
      model: propsToModel(props, isControlled),
      dictionary: propsToDictionary(props),
    },
    {
      value: {
        isControlled,
        // TODO Vinogradov
        publicCallback: (value: boolean) =>
          callbacks.current.valueChange && callbacks.current.valueChange!(value),
      }
    }
  ), []);

  useSecondEffect(() => {
    isControlled && rootCore.updateState({ model: propsToModel(props, true) });
    rootCore.updateState({ dictionary: propsToDictionary(props) });
    rootCore.completeUpdate();
  }, [props]);

  useEffect(() => () => {
    rootCore.destroy();
  }, []);

  return (
    <SlideToggleContext.Provider value={containerCore}>
      <DxSlideToggleContainer/>
    </SlideToggleContext.Provider>
  )
});
