import {PagerDictionary} from '@dx/core/components/pager';
import {DxPagerProps} from '../types';
import {PAGER_DEFAULT_VIEWS} from '../views/defaultViews';

const propsToDictionary = (props: DxPagerProps): Partial<PagerDictionary> => {
  const result: Partial<PagerDictionary> = {
    pagerView: props.pagerView || PAGER_DEFAULT_VIEWS.pagerView,
    pageNumberView: props.pageNumberView || PAGER_DEFAULT_VIEWS.pageNumberView,
    pageNumberItemView: props.pageNumberItemView || PAGER_DEFAULT_VIEWS.pageNumberItemView,
    pageNumberFakeItemView: props.pageNumberFakeItemView || PAGER_DEFAULT_VIEWS.pageNumberFakeItemView,
    pageSizeView: props.pageSizeView || PAGER_DEFAULT_VIEWS.pageSizeView,
    pageSizeItemView: props.pageSizeItemView || PAGER_DEFAULT_VIEWS.pageSizeItemView,
  };

  props.pageCount !== undefined && (result.pageCount = props.pageCount);
  props.pageSizes !== undefined && (result.pageSizes = props.pageSizes);

  return result;
}

export {propsToDictionary};
