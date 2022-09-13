type TPropType = 'model' | 'config' | 'template';

type TProp<TValue, Type extends TPropType> = {
  type: Type;
  value: TValue;
}
type TModelInput<TValue> = TProp<TValue, 'model'>;
type TConfigInput<TValue> = TProp<TValue, 'config'>;
type TTemplateInput = TProp<unknown, 'template'>;

type TContractsConfig = Record<string, TProp<unknown, TPropType>>;

type TSelectKeys<TConfig extends TContractsConfig, TCondition extends TPropType> = {
  [Key in keyof TConfig]:
  TConfig[Key]['type'] extends TCondition
    ? Key
    : never;
};

type TSelectInput<TConfig extends TContractsConfig, TCondition extends TPropType> =
  TSelectKeys<TConfig, TCondition>[keyof TConfig];


type PickInputs<TConfig extends TContractsConfig, K extends keyof TConfig> = {
  [P in K]: TConfig[P]['value'];
}

export type {
  TPropType,
  TContractsConfig,
  TModelInput,
  TConfigInput,
  TTemplateInput,
  TSelectInput,
  PickInputs,
}
