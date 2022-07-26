import {ViewModelGenerator} from "../../../core/viewModel";
import {ISlideToggleState} from "../state/state";

interface ISlideToggleViewModel {
  value: boolean;
  text: string;
  textPosition: 'left' | 'right';
}

class SlideToggleViewModelGenerator extends ViewModelGenerator<ISlideToggleState, ISlideToggleViewModel> {
  generate(state: ISlideToggleState): ISlideToggleViewModel {
    console.log('go go view model!');
    return {
      value: state.model.value,
      text: state.viewData.text,
      textPosition: state.viewData.textPosition,
    }
  }
}

export {
  ISlideToggleViewModel,
  SlideToggleViewModelGenerator,
}