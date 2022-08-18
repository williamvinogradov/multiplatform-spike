import {State} from '../../core';
import {ISimpleButtonState, SIMPLE_BUTTON_DEFAULT_STATE} from '../../types/simpleButton';

class SimpleButtonState extends State<ISimpleButtonState> {
  constructor() {
    super(SIMPLE_BUTTON_DEFAULT_STATE);
  }
}

export {
  SimpleButtonState,
}
