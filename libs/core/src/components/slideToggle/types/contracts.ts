import {TTextPosition} from './index';

/* models */
interface SlideToggleContractModels {
  value: boolean;
}

/* configs */
interface SlideToggleContractConfigs {
  text: string;
  textPosition: TTextPosition;
}

/* templates */
interface SlideToggleContractTemplates {
  indicatorView: unknown;
  textView: unknown;
}

interface SlideToggleContracts
  extends SlideToggleContractModels, SlideToggleContractConfigs, SlideToggleContractTemplates {
}

export {
  SlideToggleContractModels,
  SlideToggleContractConfigs,
  SlideToggleContractTemplates,
  SlideToggleContracts,
}
