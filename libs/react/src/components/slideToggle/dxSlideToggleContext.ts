import React from 'react';
import {SlideToggleStore} from "dx-core";

const DxSlideToggleContext = React.createContext<SlideToggleStore | undefined>(undefined);

export {DxSlideToggleContext};