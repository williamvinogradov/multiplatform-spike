import {PagerState} from '../state';
import {RootTemplateVM} from './types';


const getRootTemplateParams = (
  {dictionary: {pagerView}}: PagerState
): RootTemplateVM => ({template: pagerView});

const createRootTemplateViewModel = (
  params: {template: unknown}
): RootTemplateVM => params;

export {getRootTemplateParams, createRootTemplateViewModel};
