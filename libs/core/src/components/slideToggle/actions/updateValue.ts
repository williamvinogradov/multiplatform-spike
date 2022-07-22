import {SlideToggleState} from "../state";
import {SlideToggleActionHandler, ISlideToggleUpdateValueAction} from "./actions";

class SlideToggleUpdateValueActionHandler extends SlideToggleActionHandler {
  constructor(private state: SlideToggleState) {
    super();
  }

  handleAction({value}: ISlideToggleUpdateValueAction) {
    this.state.updateState((state) => ({
      ...state,
      model: {
        value,
      }
    }))
  }
}

export {
  SlideToggleUpdateValueActionHandler,
}