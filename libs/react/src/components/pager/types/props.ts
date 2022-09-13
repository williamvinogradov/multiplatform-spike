import {PAGER_DEFAULT_STATE} from '@dx/core/components/pager';
import {TPagerContractsConfig} from '@dx/core/types/pager';
import {TReactProps} from '../../../common/types2';
import {
  DxPagerPageNumberItemView,
  DxPagerPageNumberView,
  DxPagerPageSizeItemView,
  DxPagerPageSizeView,
  DxPagerView
} from '../views';
import {
  TPageNumberItemTemplate,
  TPageNumberTemplate,
  TPagerTemplate,
  TPageSizeItemTemplate,
  TPageSizeTemplate
} from './templates';

interface IDxPagerProps extends TReactProps<TPagerContractsConfig> {
  pagerTemplate?: TPagerTemplate,
  pageNumberTemplate?: TPageNumberTemplate,
  pageNumberItemTemplate?: TPageNumberItemTemplate,
  pageSizeTemplate?: TPageSizeTemplate,
  pageSizeItemTemplate?: TPageSizeItemTemplate,
}

const PAGER_DEFAULT_PROPS: IDxPagerProps = {
  pageCount: PAGER_DEFAULT_STATE.pageNumber.count,
  pageSizes: PAGER_DEFAULT_STATE.pageSize.sizes,
  pagerTemplate: DxPagerView,
  pageNumberTemplate: DxPagerPageNumberView,
  pageNumberItemTemplate: DxPagerPageNumberItemView,
  pageNumberFakeItemTemplate: DxPagerPageNumberItemView,
  pageSizeTemplate: DxPagerPageSizeView,
  pageSizeItemTemplate: DxPagerPageSizeItemView,
}

export type {
  IDxPagerProps
};
export {PAGER_DEFAULT_PROPS};
