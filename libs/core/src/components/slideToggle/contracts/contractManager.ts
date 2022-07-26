import {ContractManager} from "../../../core";
import {ESlideToggleActions, ISlideToggleState, SlideToggleStore} from "../store";

interface ISlideToggleInputs {
  value: boolean;
  text: string;
  textPosition: 'left' | 'right';
}

interface ISlideToggleOutputs {
  valueChanged: boolean;
}

const DEFAULT_SLIDE_TOGGLE_INPUTS: ISlideToggleInputs = {
  value: false,
  text: '',
  textPosition: 'right',
}

class SlideToggleContractManager
  extends ContractManager<ISlideToggleInputs, ISlideToggleOutputs, ESlideToggleActions, ISlideToggleState> {
  constructor(store: SlideToggleStore) {
    super(store);
  }
}

export {
  ISlideToggleInputs,
  ISlideToggleOutputs,
  DEFAULT_SLIDE_TOGGLE_INPUTS,
  SlideToggleContractManager
}
