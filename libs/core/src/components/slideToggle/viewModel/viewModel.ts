import {ViewModelGenerator} from "../../../core/viewModel";
import {ISlideToggleState} from "../state";
import {ISlideToggleViewModel} from './interfaces';

class SlideToggleViewModelGenerator extends ViewModelGenerator<ISlideToggleState, ISlideToggleViewModel> {
  generate(state: ISlideToggleState): ISlideToggleViewModel {
    return {
      value: state.model.value,
      text: state.viewData.text,
      textPosition: state.viewData.textPosition,
    }
  }
}

export {
  SlideToggleViewModelGenerator,
}