interface ISlideToggleState {
  model: {
    value: boolean;
  },
  viewData: {
    text: string;
    textPosition: 'left' | 'right';
  }
}

const SLIDE_TOGGLE_DEFAULT_STATE: ISlideToggleState = {
  model: {
    value: false,
  },
  viewData: {
    text: '',
    textPosition: 'right',
  }
}

export {
  ISlideToggleState,
  SLIDE_TOGGLE_DEFAULT_STATE,
}