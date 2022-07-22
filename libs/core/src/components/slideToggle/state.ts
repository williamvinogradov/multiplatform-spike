import {State} from "../../core";

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

class SlideToggleState extends State<ISlideToggleState> {
  constructor() {
    super(SLIDE_TOGGLE_DEFAULT_STATE);
  }
}

export {
  ISlideToggleState,
  SlideToggleState,
}