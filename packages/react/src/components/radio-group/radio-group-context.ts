import { RadioGroupState } from '@devexpress/components/dist/radio-group/state';
import { Store } from '@devexpress/core';
import { createContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RadioGroupContext = createContext<Store<RadioGroupState<any>> | null>(null);
