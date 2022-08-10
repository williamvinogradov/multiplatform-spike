import React from 'react';
import {SlideToggleStore} from "@dx/core/components/slideToggle";

const DxSlideToggleContext = React.createContext<SlideToggleStore | undefined>(undefined);

export {DxSlideToggleContext};