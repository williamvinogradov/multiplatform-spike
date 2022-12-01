import React, {
  useId, forwardRef, useContext, useCallback,
} from 'react';
import { Actions } from '@devexpress/components';
import {
  RadioButtonProps,
  LabelTemplateProps,
  RadioTemplateProps,
} from './types';
import { RadioGroupContext } from '../radio-group/radio-group-context';
import { useCoreState } from '../../internal/hooks';

const DefaultRadioTemplate = ({ checked = false }: RadioTemplateProps) => (
  <span>{checked ? '◉' : '◎'}</span>
);

const DefaultLabelTemplate = ({ label }: LabelTemplateProps) => (
  <span>{label}</span>
);

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      name,
      value,
      checked: checkedProp,
      onClick,
      onChange,
      label,
      radioTemplate,
      labelTemplate,
    },
    inputRef,
  ) => {
    const { stateManager, dispatcher } = useContext(RadioGroupContext) || {};
    const stateFromContext = useCoreState(stateManager);

    const handleOnChange = useCallback(
      (e: React.ChangeEvent) => {
        dispatcher?.dispatch(Actions.updateValue, {
          value,
        });

        onChange?.(e);
      },
      [dispatcher, onChange, value],
    );

    const inputId = useId();

    const checked = checkedProp !== undefined ? checkedProp : stateFromContext?.value === value;
    const RadioComponent = radioTemplate || DefaultRadioTemplate;
    const LabelComponent = labelTemplate || DefaultLabelTemplate;

    return (
      <span>
        <label
          htmlFor={inputId}
          style={{ cursor: 'pointer', userSelect: 'none' }}
        >
          <input
            ref={inputRef}
            id={inputId}
            name={name}
            style={{ display: 'none' }}
            type="radio"
            value={value}
            checked={checked}
            onClick={onClick}
            onChange={handleOnChange}
          />
          <RadioComponent checked={checked} />
          {label && <LabelComponent label={label} />}
        </label>
      </span>
    );
  },
);
