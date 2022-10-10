import {SlideToggleStore, UpdateValueAction} from '@dx/core/components/slideToggle';
import {callPropCallback} from '../../../internal';
import {DxSlideToggleProps} from '../types/public';

const valueChangeControlled = (props: DxSlideToggleProps): (value: boolean) => void => {
  return (value) => callPropCallback(props.valueChange, value);
}

const valueChangeUncontrolled = (
  store: SlideToggleStore,
  props: DxSlideToggleProps,
): (value: boolean) => void => {
  return (value) => {
    store.dispatch(new UpdateValueAction(value));
    const newState = store.getState();
    callPropCallback(props.valueChange, newState.model.value);
  }
}

export {
  valueChangeControlled,
  valueChangeUncontrolled,
}
