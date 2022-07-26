import {ISlideToggleInputs} from "../props/props";
import {SlideToggleAction, SlideToggleActionHandler} from "./base";
import {ESlideToggleActions} from "./actionTypes";

class SlideToggleActionUpdateStateFromInputs extends SlideToggleAction {
  constructor(public inputs: ISlideToggleInputs) {
    super(ESlideToggleActions.updateStateFromInputs);
  }
}

class SlideToggleActionHandlerUpdateStateFromInputs extends SlideToggleActionHandler {
  handleAction({inputs}: SlideToggleActionUpdateStateFromInputs): void {
    this.state.updateState((state) => ({
      ...state,
      model: {
        value: inputs.value,
      },
      viewData: {
        text: inputs.text,
        textPosition: inputs.textPosition,
      },
    }), false);
  }
}

export {
  SlideToggleActionUpdateStateFromInputs,
  SlideToggleActionHandlerUpdateStateFromInputs,
}