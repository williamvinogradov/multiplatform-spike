import { createContext } from 'react';
import {ContainerPagerCore} from '@dx/core/components/pager';


const PagerContext = createContext<ContainerPagerCore | null>(null);

export {PagerContext};
