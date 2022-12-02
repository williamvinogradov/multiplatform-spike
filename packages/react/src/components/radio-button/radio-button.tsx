import React, {
  useId, forwardRef, useContext,
} from 'react';
import { Actions } from '@devexpress/components';
import {
  RadioButtonProps,
  LabelTemplateProps,
  RadioTemplateProps,
} from './types';
import { RadioGroupContext } from '../radio-group/radio-group-context';
import { useCoreState } from '../../internal/hooks';

function useOptionalRadioGroupContext() {
  const radioGroupContext = useContext(RadioGroupContext);
  const state = useCoreState(radioGroupContext?.stateManager);
  if (radioGroupContext && state) {
    return { state, dispatcher: radioGroupContext.dispatcher };
  }
  return undefined;
}

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
    const radioGroupContext = useOptionalRadioGroupContext();

    const inputId = useId();

    const handleOnChange = radioGroupContext ? () => {
      radioGroupContext.dispatcher.dispatch(Actions.updateValue, {
        value,
      });
      return true;
    } : onChange;

    const checked = radioGroupContext ? radioGroupContext.state.value === value : checkedProp;
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
