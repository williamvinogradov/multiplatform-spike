import { ComponentType, ReactElement } from 'react';

export type PayloadType = string | ReactElement;

export interface RadioTemplateProps {
  selected: boolean;
}

export interface PayloadTemplateProps {
  payload: PayloadType;
}

export interface RadioButtonProps {
  value: string;
  selected: boolean;
  selectedChange: React.MouseEventHandler;
  payload: PayloadType;
  radioTemplate?: ComponentType<RadioTemplateProps>;
  payloadTemplate?: ComponentType<PayloadTemplateProps>;
}
