import {DxOutputs} from '../../common';
import {ISlideToggleOutputs, ISlideToggleState} from '../../types/slideToggle';

class DxSlideToggleOutputs extends DxOutputs<ISlideToggleState, ISlideToggleOutputs> {
  outputs$ = {
    valueChange: this.getOutput$(({value}) => value),
  }
}

export {
  DxSlideToggleOutputs,
}
