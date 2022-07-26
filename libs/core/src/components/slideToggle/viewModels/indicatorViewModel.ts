interface ISlideToggleIndicatorVM {
  value: boolean;
  textPosition: 'left' | 'right';
}

function getSlideToggleIndicatorVM({value, textPosition}: {value: boolean; textPosition: 'left' | 'right'},
): ISlideToggleIndicatorVM {
  return {
    value,
    textPosition,
  }
}

export {
  ISlideToggleIndicatorVM,
  getSlideToggleIndicatorVM,
}