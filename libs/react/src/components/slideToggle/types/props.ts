import {SLIDE_TOGGLE_DEFAULT_STATE} from '@dx/core/components/slideToggle';
import {TSlideInputContractsConfig} from '@dx/core/types/slideToggle';
import {TReactProps} from '../../../common/types2';
import {DxSlideToggleIndicatorView} from '../views/dxSlideToggleIndicatorView';
import {DxSlideToggleTextView} from '../views/dxSlideToggleTextView';
import {TIndicatorViewTemplate, TTextViewTemplate} from './templates';

interface IDxSlideToggleProps extends TReactProps<TSlideInputContractsConfig> {
  indicatorViewTemplate?: TIndicatorViewTemplate;
  textViewTemplate?: TTextViewTemplate;
}

const DX_SLIDE_TOGGLE_DEFAULT_PROPS: IDxSlideToggleProps = {
  text: SLIDE_TOGGLE_DEFAULT_STATE.config.text,
  textPosition: SLIDE_TOGGLE_DEFAULT_STATE.config.textPosition,
  indicatorViewTemplate: DxSlideToggleIndicatorView,
  textViewTemplate: DxSlideToggleTextView,
}

export type {
  IDxSlideToggleProps,
}

export {DX_SLIDE_TOGGLE_DEFAULT_PROPS};
