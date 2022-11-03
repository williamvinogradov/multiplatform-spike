import {
  ModelOptions,
  ConfigOptions,
  TemplateOptions,
} from '@dx/core/components/slideToggle';
import {ReactContracts} from '../../../internal';
import {IndicatorViewTemplate, TextViewTemplate} from './templates';

type ReactSlideToggleContracts = ReactContracts<ModelOptions, ConfigOptions, TemplateOptions>;

interface DxSlideToggleProps extends ReactSlideToggleContracts {
  indicatorView?: IndicatorViewTemplate;
  textView?: TextViewTemplate;
}

export type {DxSlideToggleProps};
