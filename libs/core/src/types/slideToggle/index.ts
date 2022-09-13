import {TConfigInput, TModelInput, TTemplateInput} from '../common';

type TTextPosition = 'left' | 'right';

type TSlideInputContractsConfig = {
  value: TModelInput<boolean>;
  text: TConfigInput<string>;
  textPosition: TConfigInput<TTextPosition>;
  indicatorView: TTemplateInput;
  textView: TTemplateInput;
}

export type {
  TTextPosition,
  TSlideInputContractsConfig,
};
