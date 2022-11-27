/* eslint-disable react/destructuring-assignment */
import {
  createRadioGroupStore, ReadonlyProps, TemplateProps, ValueProps,
} from '@devexpress/components';
import { UpdateSource } from '@devexpress/core';
import React, { PropsWithChildren, useMemo } from 'react';
import { useSecondEffect } from '../../internal/hooks';
import { useCallbackRef } from '../../internal/hooks/use-callback-ref';
import { Props } from '../../internal/props';
import { RadioGroupContext } from './radio-group-context';

function RadioGroupInternal<T>(props: RadioGroupProps<T>) {
  const controlledMode = props.value !== undefined;

  const valueChange = useCallbackRef(props.valueChange);
  const store = useMemo(() => createRadioGroupStore(
    { value: controlledMode ? props.value : props.defaultValue },
    {
      value: {
        controlledMode,
        changeCallback: (value?: T) => { valueChange.current(value); },
      },
    },
  ), []);

  useSecondEffect(() => {
    if (controlledMode) {
      store.addUpdate(() => ({ value: props.value }));
    }

    store.commitUpdates(UpdateSource.props);
  }, [props.value]);

  return (
    <RadioGroupContext.Provider value={store}>
      <div>
        {props.children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export type RadioGroupProps<T> =
  PropsWithChildren<Props<ValueProps<T>, ReadonlyProps, TemplateProps>>;

export const RadioGroup = RadioGroupInternal;
