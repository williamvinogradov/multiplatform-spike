import {SlideToggleVM, TTextPosition} from '@dx/core/components/slideToggle';
import {IndicatorViewTemplate, TextViewTemplate} from './templates';


interface SlideToggleReactVM extends SlideToggleVM {
  dictionary: {
    text: string;
    textPosition: TTextPosition;
    indicatorView: IndicatorViewTemplate,
    textView: TextViewTemplate,
  }
}

export type {SlideToggleReactVM};
