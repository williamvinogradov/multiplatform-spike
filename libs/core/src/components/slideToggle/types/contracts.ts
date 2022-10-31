import {TTextPosition} from './index';

export interface SlideToggleContracts {
  value: boolean;
  text: string;
  textPosition: TTextPosition;
  indicatorView: unknown;
  textView: unknown;
}
export type TemplateNames = 'indicatorView' | 'textView';
export type Bindables = 'value';
type OtherNames = Exclude<keyof SlideToggleContracts, TemplateNames | Bindables>;

export type SlideToggleContractModels = Pick<SlideToggleContracts, Bindables>;
export type SlideToggleContractTemplates = Pick<SlideToggleContracts, TemplateNames>;
export type SlideToggleContractConfigs = Pick<SlideToggleContracts, OtherNames>
