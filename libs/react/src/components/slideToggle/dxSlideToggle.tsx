import React, {useMemo} from 'react';
import {DxSlideToggleCore, ISlideToggleState} from '@dx/core/components/slideToggle';
import {useViewModel} from '../../common/hooks';
import {DxSlideToggleTemplate} from './containers/dxSlideToggleTemplate';
import {useControlled} from './hooks/useControlled';
import {useUncontrolled} from './hooks/useUncontrolled';
import {useUpdateFromProps} from './hooks/useUpdateFromProps';
import {DX_SLIDE_TOGGLE_DEFAULT_PROPS, IDxSlideToggleProps, ISlideToggleReactVM} from './types';

function DxSlideToggle(props: IDxSlideToggleProps) {
  const isControlled = props.value !== undefined;

  const component = useMemo(() => new DxSlideToggleCore(), []);
  const viewModel = useViewModel<ISlideToggleState, ISlideToggleReactVM>(component.viewModel$);

  useUpdateFromProps(component, props);

  const [updateValue] = isControlled
    ? useControlled(component, props, viewModel)
    : useUncontrolled(component, props, viewModel);

  return viewModel
    ? <DxSlideToggleTemplate viewModel={viewModel} updateValue={updateValue} />
    : null;
}

DxSlideToggle.defaultProps = DX_SLIDE_TOGGLE_DEFAULT_PROPS;

export {
  IDxSlideToggleProps,
  DxSlideToggle,
}
