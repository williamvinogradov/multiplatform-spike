import {DxSlideToggleCore, ISlideToggleState} from '@dx/core/components/slideToggle';
import {useCallback, useEffect} from 'react';
import {IDxSlideToggleProps} from '../types';

function useControlled(
  component: DxSlideToggleCore,
  props: IDxSlideToggleProps,
  viewModel?: ISlideToggleState,
  ) {
  useEffect(() => {
    component.updateStateFromProps({
      value: props.value,
    })
  }, [props.value]);

  const updateValue = useCallback(() => {
    if (!props.valueChange) {
      throw Error('\'valueChange\' callback not set in controlled mode.');
    }

    props.valueChange(!viewModel?.value || false);
  }, [viewModel, props.valueChange]);

  return [
    updateValue
  ];
}

export {useControlled};
