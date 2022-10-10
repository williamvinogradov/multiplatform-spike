import {useMemo} from 'react';
import {createSlideToggleStore, SlideToggleStore} from '@dx/core/components/slideToggle';
import {SlideToggleCallbacks, SlideToggleContextType} from '../dxSlideToggleContext';
import {DxSlideToggleProps} from '../types/public';
import {propsToContracts, valueChangeControlled, valueChangeUncontrolled} from '../utils';

const useCoreContext = (
  props: DxSlideToggleProps,
  isControlled: boolean
): [SlideToggleStore, SlideToggleContextType] => {
  const store = useMemo(() => {
    const contracts = propsToContracts(props, true, isControlled);
    return createSlideToggleStore(contracts);
  }, []);

  const callbacks: SlideToggleCallbacks = useMemo(() => ({
    valueChange: isControlled
      ? valueChangeControlled(props)
      : valueChangeUncontrolled(store, props)
  }), [props.valueChange]);

  const context: SlideToggleContextType = useMemo(() => ([store, callbacks]), [callbacks]);

  return [store, context];
};

export {useCoreContext};
