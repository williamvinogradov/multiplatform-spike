import { ViewModelValue } from '@devexpress/core';
import { useEffect, useState } from 'react';

export function useViewModel<T>(viewModel: ViewModelValue<T>): T {
  const [, reRender] = useState({});
  useEffect(() => {
    const unsubscribe = viewModel.subscribe(() => {
      reRender({});
    });
    return unsubscribe;
  });
  return viewModel.getValue();
}
