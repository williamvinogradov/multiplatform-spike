import {
  SlideToggleContractConfigs,
  SlideToggleContractModels,
  SlideToggleContractTemplates,
} from '@dx/core/components/slideToggle';
import {ReactContracts} from '../../../../internal';
import {IndicatorViewTemplate, TextViewTemplate} from './templates';

type ReactSlideToggleContracts = ReactContracts<SlideToggleContractModels, SlideToggleContractConfigs, SlideToggleContractTemplates>;

interface DxSlideToggleProps extends ReactSlideToggleContracts {
  indicatorView?: IndicatorViewTemplate;
  textView?: TextViewTemplate;
}

export type {DxSlideToggleProps};
