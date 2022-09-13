import {DxSlideToggleCore, ISlideToggleState} from '@dx/core/components/slideToggle';
import {useCallback, useEffect} from 'react';
import {useOutput} from '../../../common/hooks';
import {IDxSlideToggleProps} from '../types';

function useUncontrolled(
  component: DxSlideToggleCore,
  props: IDxSlideToggleProps,
  viewModel?: ISlideToggleState,
) {
  useEffect(() => {
    component.updateStateFromProps({
      value: props.defaultValue,
    })
  }, []);

  useOutput(component.valueChangeOutput$, props.valueChange);

  const updateValue = useCallback(
    () => {
      component.updateValue(!viewModel?.value || false)
    },
    [viewModel, props.valueChange]
  );

  return [
    updateValue
  ];
}

export {useUncontrolled};
