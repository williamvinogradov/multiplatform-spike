import {SlideToggleModel} from '@dx/core/components/slideToggle';
import {DxSlideToggleProps} from '../types';

const propsToModel = (props: DxSlideToggleProps, isControlled: boolean): Partial<SlideToggleModel> => {
  const result: Partial<SlideToggleModel> = {};

  isControlled && props.value !== undefined && (result.value = props.value);
  !isControlled && props.defaultValue !== undefined && (result.value = props.defaultValue);

  return result;
};

export {propsToModel};
