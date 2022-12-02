import { ComponentType, ReactElement } from 'react';
import { RadioGroupValue } from '../radio-group';

export type LabelType = string | ReactElement;

export interface RadioTemplateProps {
  checked?: boolean;
}

export interface LabelTemplateProps {
  label: LabelType;
}

export interface RadioButtonProps {
  value: RadioGroupValue;
  name?: string;
  checked?: boolean;
  label?: LabelType;
  radioTemplate?: ComponentType<RadioTemplateProps>;
  labelTemplate?: ComponentType<LabelTemplateProps>;
  onChange?: React.ChangeEventHandler;
  onClick?: React.MouseEventHandler;
}
