import {ContractManager} from "../../../core";
import {ESlideToggleActions, ISlideToggleState} from "../store";

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
  extends ContractManager<ISlideToggleOutputs, ESlideToggleActions, ISlideToggleState> {
}

export {
  ISlideToggleInputs,
  ISlideToggleOutputs,
  DEFAULT_SLIDE_TOGGLE_INPUTS,
  SlideToggleContractManager
}
