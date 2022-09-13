import {PickInputs, TContractsConfig, TSelectInput} from '@dx/core/types/common';

type TReactModels<TConfig extends TContractsConfig> = PickInputs<TConfig, TSelectInput<TConfig, 'model'>>;
type TReactConfigs<TConfig extends TContractsConfig> = PickInputs<TConfig, TSelectInput<TConfig, 'config'>>;
type TReactTemplates<TConfig extends TContractsConfig> = PickInputs<TConfig, TSelectInput<TConfig, 'template'>>;
type TOutputProp<P extends string> = `${P}Change`;
type TDefaultProp<P extends string> = `default${Capitalize<P>}`;
type TTemplateProp<P extends string> = `${P}Template`;
type WithOutputCallback<T> = { [P in keyof T & string as TOutputProp<P>]: (value: T[P]) => void };
type WithDefaultModels<T> = { [P in keyof T & string as TDefaultProp<P>]: T[P] };
type WithTemplate<T> = { [P in keyof T & string as TTemplateProp<P>]: T[P] };

type TReactModelProps<TConfig extends TContractsConfig> = TReactModels<TConfig>
  & WithDefaultModels<TReactModels<TConfig>>
  & WithOutputCallback<TReactModels<TConfig>>;

type TReactConfigProps<TConfig extends TContractsConfig> = TReactConfigs<TConfig>;
type TReactTemplateProps<TConfig extends TContractsConfig> = TReactTemplates<TConfig>;

type TReactProps<TConfig extends TContractsConfig> =
  Partial<TReactModelProps<TConfig>
  & TReactConfigProps<TConfig>
  & WithTemplate<TReactTemplateProps<TConfig>>>;

export type {
  TReactProps,
  TReactModels,
  TReactModelProps,
  TOutputProp,
  TDefaultProp,
  WithDefaultModels,
  WithOutputCallback
}
