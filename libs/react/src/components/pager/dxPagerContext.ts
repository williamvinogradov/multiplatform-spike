import React from 'react';
import {PagerContractModels, PagerStore} from '@dx/core/components/pager';
import {ComponentContext, ContextCallbacks} from '../../internal';

type PagerCallbacks = ContextCallbacks<PagerContractModels>;
type PagerContextType = ComponentContext<PagerStore, PagerContractModels>;

const PagerContext = React.createContext<PagerContextType | null>(null);

export type {PagerCallbacks, PagerContextType};
export {PagerContext};
