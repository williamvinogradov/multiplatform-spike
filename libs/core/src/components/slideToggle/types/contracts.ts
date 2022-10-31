import {TTextPosition} from './index';

export interface SlideToggleContracts {
  value: boolean;
  text: string;
  textPosition: TTextPosition;
  indicatorView: unknown;
  textView: unknown;
}
type TemplateNames = 'indicatorView' | 'textView';
type ModelNames = 'value';
type OtherNames = Exclude<keyof SlideToggleContracts, TemplateNames | ModelNames>;

export type SlideToggleContractModels = Pick<SlideToggleContracts, ModelNames>;
export type SlideToggleContractTemplates = Pick<SlideToggleContracts, TemplateNames>;
export type SlideToggleContractConfigs = Pick<SlideToggleContracts, OtherNames>
