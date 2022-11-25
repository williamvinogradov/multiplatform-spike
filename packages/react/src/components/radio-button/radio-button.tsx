import React, { useMemo, useId, forwardRef } from 'react';
import {
  RadioButtonProps,
  LabelTemplateProps,
  RadioTemplateProps,
} from './types';

const DefaultRadioTemplate = React.memo(({ checked }: RadioTemplateProps) => (
  <span>{checked ? '◉' : '◎'}</span>
));

const DefaultLabelTemplate = React.memo(({ label }: LabelTemplateProps) => (
  <span>{label}</span>
));

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      value, checked, onClick, onChange, label, radioTemplate, labelTemplate,
    },
    inputRef,
  ) => {
    const RadioComponent = useMemo(
      () => radioTemplate || DefaultRadioTemplate,
      [radioTemplate],
    );
    const LabelComponent = useMemo(
      () => labelTemplate || DefaultLabelTemplate,
      [labelTemplate],
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
            checked={checked}
            onClick={onClick}
            onChange={onChange}
          />
          <RadioComponent checked={checked} />
          <LabelComponent label={label} />
        </label>
      </span>
    );
  },
);
