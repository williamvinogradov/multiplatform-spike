import {ISlideToggleState} from '@dx/core/components/slideToggle';
import {TIndicatorViewTemplate, TTextViewTemplate} from './templates';

interface ISlideToggleReactVM extends ISlideToggleState {
  templates: {
    indicatorView: TIndicatorViewTemplate,
    textView: TTextViewTemplate,
  }
}

export type {
  ISlideToggleReactVM
};
