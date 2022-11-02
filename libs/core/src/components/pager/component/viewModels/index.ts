import {createViewModelFunc} from '../../../../internal';
import {createPageNumberViewModel, getPageNumberParams} from './pageNumber';
import {createPageSizeViewModel, getPageSizeParams} from './pageSize';
import {createRootTemplateViewModel, getRootTemplateParams} from './rootTemplate';


const PAGER_VIEW_MODELS = {
  rootTemplate: createViewModelFunc(getRootTemplateParams, createRootTemplateViewModel),
  pageNumber: createViewModelFunc(getPageNumberParams, createPageNumberViewModel),
  pageSize: createViewModelFunc(getPageSizeParams, createPageSizeViewModel),
}

export * from './types';
export {PAGER_VIEW_MODELS};
