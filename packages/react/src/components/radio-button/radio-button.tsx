import React, { useMemo, useId, forwardRef } from 'react';
import {
  RadioButtonProps,
  PayloadTemplateProps,
  RadioTemplateProps,
} from './types';

import './style.scss';

const DefaultRadioTemplate = React.memo(({ selected }: RadioTemplateProps) => (
  <span>{selected ? '◉' : '◎'}</span>
));

const DefaultPayloadTemplate = React.memo(
  ({ payload }: PayloadTemplateProps) => <span>{payload}</span>,
);

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      value,
      selected,
      onClick,
      onChange,
      payload,
      radioTemplate,
      payloadTemplate,
    },
    inputRef,
  ) => {
    const RadioComponent = useMemo(
      () => radioTemplate || DefaultRadioTemplate,
      [radioTemplate],
    );
    const PayloadComponent = useMemo(
      () => payloadTemplate || DefaultPayloadTemplate,
      [payloadTemplate],
    );

    const inputId = useId();

    return (
      <span>
        <label
          htmlFor={inputId}
          style={{ cursor: 'pointer', userSelect: 'none' }}
        >
          <input
            ref={inputRef}
            id={inputId}
            style={{ display: 'none' }}
            type="radio"
            value={value}
            checked={selected}
            onClick={onClick}
            onChange={onChange}
          />
          <RadioComponent selected={selected} />
          <PayloadComponent payload={payload} />
        </label>
      </span>
    );
  },
);
