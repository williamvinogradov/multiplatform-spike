interface ISlideToggleInputs {
  value: boolean;
  text: string;
  textPosition: 'left' | 'right';
}

interface ISlideToggleOutputs {
  valueChanged: boolean;
}

const DEFAULT_SLIDE_TOGGLE_INPUTS: ISlideToggleInputs = {
  value: false,
  text: '',
  textPosition: 'right',
}

export {
  ISlideToggleInputs,
  ISlideToggleOutputs,
  DEFAULT_SLIDE_TOGGLE_INPUTS
}