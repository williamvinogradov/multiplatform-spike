import {SlideToggleDictionary} from '@dx/core/components/slideToggle';
import {DxSlideToggleInputs} from '../types';
import {SLIDE_TOGGLE_DEFAULT_VIEWS} from '../views';


const inputsToDictionary = (inputs: DxSlideToggleInputs): Partial<SlideToggleDictionary> => {
  const result: Partial<SlideToggleDictionary> = {
    indicatorView: inputs.indicatorView || SLIDE_TOGGLE_DEFAULT_VIEWS.indicatorView,
    textView: inputs.textView || SLIDE_TOGGLE_DEFAULT_VIEWS.textView,
  };

  inputs.text !== undefined && (result.text = inputs.text);
  inputs.textPosition !== undefined && (result.textPosition = inputs.textPosition);

  return result;
}

export {inputsToDictionary};
