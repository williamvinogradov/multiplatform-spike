import {PagerDictionary} from '@dx/core/components/pager';
import {DxPagerInputs} from '../types';
import {PAGER_DEFAULT_VIEWS} from '../views';


const inputsToDictionary = (inputs: DxPagerInputs): Partial<PagerDictionary> => {
  const result: Partial<PagerDictionary> = {
    pagerView: inputs.pagerView || PAGER_DEFAULT_VIEWS.pagerView,
    pageNumberView: inputs.pageNumberView || PAGER_DEFAULT_VIEWS.pageNumberView,
    pageNumberItemView: inputs.pageNumberItemView || PAGER_DEFAULT_VIEWS.pageNumberItemView,
    pageNumberFakeItemView: inputs.pageNumberFakeItemView || PAGER_DEFAULT_VIEWS.pageNumberFakeItemView,
    pageSizeView: inputs.pageSizeView || PAGER_DEFAULT_VIEWS.pageSizeView,
    pageSizeItemView: inputs.pageSizeItemView || PAGER_DEFAULT_VIEWS.pageSizeItemView,
  };

  inputs.pageCount !== undefined && (result.pageCount = inputs.pageCount);
  inputs.pageSizes !== undefined && (result.pageSizes = inputs.pageSizes);

  return result;
}

export {inputsToDictionary};
