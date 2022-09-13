import {DxLogic, getViewModel} from '../../../../common';
import {IPagerPageNumberState, IPagerState} from '../../state';
import { selectPageAction } from './actions/selectPageAction';
import {updateFromPropsAction} from './actions/updateFromPropsAction';
import {getPagerPageNumberSlice, getPagerPageNumberVM} from './viewModels/pageNumbersVM';

class PageNumberLogic extends DxLogic<IPagerState> {
  viewModel$ = this.state$.pipe(getViewModel(getPagerPageNumberSlice, getPagerPageNumberVM));

  updateFromProps(pageNumberStatePart: Partial<IPagerPageNumberState>, normalize = true): void {
    this.state.updateState(updateFromPropsAction(pageNumberStatePart, normalize));
  }

  selectPageAction(selectedPage: number): void {
    this.state.updateState(selectPageAction(selectedPage));
  }
}

export {PageNumberLogic};
