/* eslint-disable react/destructuring-assignment */
import { createRadioButtonSelector, updateValueAction } from '@devexpress/components';
import { RadioGroupState } from '@devexpress/components/dist/radio-group/state';
import { Store } from '@devexpress/core';
import React, { memo, useCallback } from 'react';
import { useSelector } from '../../internal/hooks';
import { useCoreContext } from '../../internal/hooks/use-core-context';
import { RadioGroupContext } from './radio-group-context';

// NOTE: It's a temporary component for the RadioGroup development
function RadioButtonInternal<T>(props: RadioButtonProps<T>) {
  const store = useCoreContext<Store<RadioGroupState<T>>>(RadioGroupContext);

  const viewModel = useSelector(
    store,
    createRadioButtonSelector(props.value),
    [props.value],
  );

  const selectOption = useCallback(() => {
    store.addUpdate(updateValueAction(props.value));
    store.commitUpdates();
  }, [props.value]);

  return (
    // eslint-disable-next-line
    <div
      onClick={selectOption}
      style={{ margin: '10px', cursor: 'pointer' }}
    >
      {viewModel.selected ? '✅' : '❌'}
    </div>
  );
}

export type RadioButtonProps<T> = {
  value: T;
};

export const RadioButton = memo(RadioButtonInternal) as typeof RadioButtonInternal;
