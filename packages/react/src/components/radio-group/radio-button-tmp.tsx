/* eslint-disable react/destructuring-assignment */
import { createRadioButtonVMSelector, createUpdateValueAction } from '@devexpress/components';
import { RadioGroupState } from '@devexpress/components/dist/radio-group/state';
import { Store } from '@devexpress/core';
import React, { memo, useCallback } from 'react';
import { useSelector } from '../../internal/hooks';
import { useCoreContext } from '../../internal/hooks/use-core-context';
import { RadioGroupContext } from './radio-group-context';

// NOTE: It's a temporary component for the RadioGroup development
function RadioButtonTmpInternal<T>(props: RadioButtonPropsTmp<T>) {
  const store = useCoreContext<Store<RadioGroupState<T>>>(RadioGroupContext);

  const viewModel = useSelector(
    store,
    createRadioButtonVMSelector(props.value),
    [props.value],
  );

  const selectOption = useCallback(() => {
    store.addUpdate(createUpdateValueAction(props.value));
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

export type RadioButtonPropsTmp<T> = {
  value: T;
};

export const RadioButtonTmp = memo(RadioButtonTmpInternal) as typeof RadioButtonTmpInternal;
