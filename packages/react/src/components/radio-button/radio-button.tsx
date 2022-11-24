import React, { useMemo, useId } from 'react';
import {
  PayloadTemplateProps,
  RadioButtonProps,
  RadioTemplateProps,
} from './types';

import './style.scss';

const DefaultRadioTemplate = React.memo<RadioTemplateProps>(({ selected }) => (
  <span>{selected ? '◉' : '◎'}</span>
));

const DefaultPayloadTemplate = React.memo<PayloadTemplateProps>(
  ({ payload }) => <span>{payload}</span>
);

export function RadioButton({
  value,
  selected,
  selectedChange,
  payload,
  radioTemplate,
  payloadTemplate,
}: RadioButtonProps) {
  const RadioComponent = useMemo(
    () => radioTemplate || DefaultRadioTemplate,
    [radioTemplate]
  );
  const PayloadComponent = useMemo(
    () => payloadTemplate || DefaultPayloadTemplate,
    [payloadTemplate]
  );

  const inputId = useId();

  return (
    <span>
      <label
        htmlFor={inputId}
        style={{ cursor: 'pointer', userSelect: 'none' }}
      >
        <input
          id={inputId}
          style={{ display: 'none' }}
          type="radio"
          value={value}
          checked={selected}
          onClick={selectedChange}
        />
        <RadioComponent selected={selected} />
        <PayloadComponent payload={payload} />
      </label>
    </span>
  );
}
