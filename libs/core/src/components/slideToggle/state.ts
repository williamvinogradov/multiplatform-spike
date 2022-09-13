import {TTextPosition} from '../../types/slideToggle';

interface ISlideToggleModelState {
  value: boolean;
}

interface ISlideToggleConfigState {
  config: {
    text: string;
    textPosition: TTextPosition;
  },
}

interface ISlideToggleTemplateState {
  templates: {
    indicatorView: unknown,
    textView: unknown,
  }
}

interface ISlideToggleState
  extends ISlideToggleModelState,
    ISlideToggleConfigState,
    ISlideToggleTemplateState {
}

const SLIDE_TOGGLE_DEFAULT_STATE: ISlideToggleState = {
  value: false,
  config: {
    text: '',
    textPosition: 'right',
  },
  templates: {
    indicatorView: undefined,
    textView: undefined,
  }
}

export type {
  ISlideToggleModelState,
  ISlideToggleConfigState,
  ISlideToggleTemplateState,
  ISlideToggleState
};
export {SLIDE_TOGGLE_DEFAULT_STATE};
