import { RadioGroupCore } from '@devexpress/components';
import React from 'react';

export type RadioGroupContextType<T> = Omit<RadioGroupCore<T>, 'stateManager'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RadioGroupContext = React.createContext<RadioGroupContextType<any> | null>(null);
