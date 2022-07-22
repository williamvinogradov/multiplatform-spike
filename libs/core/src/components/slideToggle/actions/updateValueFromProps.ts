import {SlideToggleActionHandler, ISlideToggleUpdateStateFromPropsAction} from "./actions";
import {SlideToggleState} from "../state";

class SlideToggleUpdateStateFromPropsActionHandler extends SlideToggleActionHandler {
  constructor(private state: SlideToggleState) {
    super();
  }

  handleAction({inputProps}: ISlideToggleUpdateStateFromPropsAction): void {
    this.state.updateState((state) => ({
      ...state,
      model: {
        value: inputProps.value,
      },
      viewData: {
        text: inputProps.text,
        textPosition: inputProps.textPosition,
      },
    }), {
      triggerOutputs: false,
    })
  }
}

export {
  ISlideToggleUpdateStateFromPropsAction,
  SlideToggleUpdateStateFromPropsActionHandler,
}