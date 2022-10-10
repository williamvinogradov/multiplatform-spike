import React from 'react';
import {SlideToggleContractModels, SlideToggleStore} from '@dx/core/components/slideToggle';
import {ComponentContext, ContextCallbacks} from '../../internal';

type SlideToggleCallbacks = ContextCallbacks<SlideToggleContractModels>;
type SlideToggleContextType = ComponentContext<SlideToggleStore, SlideToggleContractModels>;

const SlideToggleContext = React.createContext<SlideToggleContextType | null>(null);

export type {SlideToggleCallbacks, SlideToggleContextType};
export {SlideToggleContext};
