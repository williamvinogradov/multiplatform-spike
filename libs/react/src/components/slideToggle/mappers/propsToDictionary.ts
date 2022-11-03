import {SlideToggleDictionary} from '@dx/core/components/slideToggle';
import {DxSlideToggleProps} from '../types';
import {SLIDE_TOGGLE_DEFAULT_VIEWS} from '../views';

const propsToDictionary = (props: DxSlideToggleProps): Partial<SlideToggleDictionary> => {
  const result: Partial<SlideToggleDictionary> = {
    textView: props.textView || SLIDE_TOGGLE_DEFAULT_VIEWS.textView,
    indicatorView: props.indicatorView || SLIDE_TOGGLE_DEFAULT_VIEWS.indicatorView,
  };

  props.text !== undefined && (result.text = props.text);
  props.textPosition !== undefined && (result.textPosition = props.textPosition);

  return result;
};

export {propsToDictionary};
