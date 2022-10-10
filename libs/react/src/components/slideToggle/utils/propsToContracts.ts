import {DeepPartial} from 'ts-essentials';
import {
  SlideToggleContractModels,
  SlideToggleContracts,
} from '@dx/core/components/slideToggle';
import {DxSlideToggleProps} from '../types/public';
import {SLIDE_TOGGLE_DEFAULT_VIEWS} from '../views';


const getContractsModel =(
  props: DxSlideToggleProps,
  isInitState: boolean,
  isControlled: boolean,
): DeepPartial<SlideToggleContractModels> => {
  switch (true) {
    case isControlled:
      return {value: props.value};
    case !isControlled && isInitState:
      return {value: props.defaultValue};
    default:
      return {};
  }
}

const propsToContracts = (
  props: DxSlideToggleProps,
  isInitState: boolean,
  isControlled: boolean,
): DeepPartial<SlideToggleContracts> => {

  return {
    ...getContractsModel(props, isInitState, isControlled),
    text: props.text,
    textPosition: props.textPosition,
    indicatorView: props.indicatorView || SLIDE_TOGGLE_DEFAULT_VIEWS.indicatorView,
    textView: props.textView || SLIDE_TOGGLE_DEFAULT_VIEWS.textView,
  }
}

export {propsToContracts};
