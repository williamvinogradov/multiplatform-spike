import {createViewModelFunc} from '../../../internal';
import {SlideToggleState} from './state';


interface SlideToggleVM extends SlideToggleState {}
interface SlideToggleViewModels {
  general: SlideToggleVM,
}

const SLIDE_TOGGLE_VIEW_MODELS = {
  general: createViewModelFunc<SlideToggleState, SlideToggleState, SlideToggleState>(
    (state) => state,
    (state) => state,
    ),
}

export type {SlideToggleVM, SlideToggleViewModels};
export {SLIDE_TOGGLE_VIEW_MODELS};
