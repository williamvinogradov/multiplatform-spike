import {ESlideToggleActions} from "./actionTypes";
import {SlideToggleAction, SlideToggleActionHandler} from "./base";

class SlideToggleActionUpdateValue extends SlideToggleAction {
  constructor(public value: boolean) {
    super(ESlideToggleActions.updateValue);
  }
}

class SlideToggleActionHandlerUpdateValue extends SlideToggleActionHandler {

  handleAction({value}: SlideToggleActionUpdateValue) {
    this.state.updateState((state) => ({
      ...state,
      model: {
        value,
      }
    }))
  }
}

export {
  SlideToggleActionUpdateValue,
  SlideToggleActionHandlerUpdateValue,
}