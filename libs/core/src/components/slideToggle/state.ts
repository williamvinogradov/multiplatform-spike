import {State} from '../../core';
import {ISlideToggleState, SLIDE_TOGGLE_DEFAULT_STATE} from '../../types/slideToggle';

class SlideToggleState extends State<ISlideToggleState> {
  constructor() {
    super(SLIDE_TOGGLE_DEFAULT_STATE);
  }
}

export {
  SlideToggleState,
}
