interface ISlideToggleInputs {
  value: boolean;
  text: string;
  textPosition: 'left' | 'right';
}

interface ISlideToggleOutputs {
  valueChanged: boolean;
}

interface ISlideToggleProps extends ISlideToggleInputs, ISlideToggleOutputs {}

export {
  ISlideToggleInputs,
  ISlideToggleOutputs,
  ISlideToggleProps,
}