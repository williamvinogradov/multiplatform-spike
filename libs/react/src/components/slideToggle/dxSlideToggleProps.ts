import {ISlideToggleState, ISlideToggleOutputs} from '@dx/core/types/slideToggle';
import {SLIDE_TOGGLE_DEFAULT_STATE} from '@dx/core/types/slideToggle';
import {TReactInputs, TReactOutputs} from '../../common/types';
import {DxSlideToggleIndicatorView, IDxSLideToggleIndicatorViewProps} from './views/dxSlideToggleIndicatorView';
import {DxSlideToggleTextView, IDxSlideToggleTextViewProps} from './views/dxSlideToggleTextView';

interface IDxSlideToggleProps extends
  TReactInputs<ISlideToggleState>,
  TReactOutputs<ISlideToggleOutputs> {
  indicatorView?: (props: IDxSLideToggleIndicatorViewProps) => JSX.Element;
  textView?: (props: IDxSlideToggleTextViewProps) => JSX.Element;
}

const SLIDE_TOGGLE_DEFAULT_PROPS: IDxSlideToggleProps = {
  ...SLIDE_TOGGLE_DEFAULT_STATE,
  indicatorView: DxSlideToggleIndicatorView,
  textView: DxSlideToggleTextView,
}

export {
  IDxSlideToggleProps,
}

export {
  SLIDE_TOGGLE_DEFAULT_PROPS,
}
