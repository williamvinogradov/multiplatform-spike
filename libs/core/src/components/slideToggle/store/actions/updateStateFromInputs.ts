import {ISlideToggleInputs} from "../../contracts/contracts";
import {SlideToggleActionHandler} from "./base";
import {ESlideToggleActions} from "./actionTypes";
import {UpdateStateFromInputsAction} from "../../../../core";

class SlideToggleActionUpdateStateFromInputs extends UpdateStateFromInputsAction<ESlideToggleActions, ISlideToggleInputs> {
  constructor(inputs: ISlideToggleInputs) {
    super(ESlideToggleActions.updateStateFromInputs, inputs);
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