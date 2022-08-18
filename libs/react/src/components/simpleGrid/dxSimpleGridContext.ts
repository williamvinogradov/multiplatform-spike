import React from 'react';
import {DxSimpleGridLogic} from '@dx/core/components/simpleGrid';


const DxSimpleGridContext = React.createContext<DxSimpleGridLogic<unknown> | undefined>(undefined);

export {DxSimpleGridContext};
