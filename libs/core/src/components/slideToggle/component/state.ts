import {StateValue} from '../../../internal';
import {ConfigOptions, ModelOptions, TemplateOptions} from '../types';


interface SlideToggleModel extends ModelOptions {}
interface SlideToggleDictionary extends ConfigOptions, TemplateOptions {}
interface SlideToggleState extends StateValue<SlideToggleModel, SlideToggleDictionary> {}

const SLIDE_TOGGLE_DEFAULT_STATE: SlideToggleState = {
  model: {
    value: false,
  },
  dictionary: {
    text: '',
    textPosition: 'right',
    indicatorView: null,
    textView: null,
  }
}

export type {SlideToggleModel, SlideToggleDictionary, SlideToggleState};
export {SLIDE_TOGGLE_DEFAULT_STATE};
