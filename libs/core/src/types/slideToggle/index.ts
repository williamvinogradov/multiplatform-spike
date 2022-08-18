type TTextPosition = 'left' | 'right';

interface ISlideToggleState {
  value: boolean;
  text: string;
  textPosition: TTextPosition;
}

interface ISlideToggleOutputs {
  valueChange: boolean;
}

const SLIDE_TOGGLE_DEFAULT_STATE: ISlideToggleState = {
  value: false,
  text: '',
  textPosition: 'right',
}

export type {
  TTextPosition,
  ISlideToggleState,
  ISlideToggleOutputs,
}

export {
  SLIDE_TOGGLE_DEFAULT_STATE,
}
