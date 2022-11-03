import {TemplateOptions} from '@dx/core/components/pager';
import {DxPagerPageNumberItemViewComponent} from './dx-pager-page-number-item-view.component';
import {DxPagerPageNumberViewComponent} from './dx-pager-page-number-view.component';
import {DxPagerPageSizeItemViewComponent} from './dx-pager-page-size-item-view.component';
import {DxPagerPageSizeViewComponent} from './dx-pager-page-size-view.component';
import {DxPagerViewComponent} from './dx-pager-view.component';


const PAGER_DEFAULT_VIEWS: TemplateOptions = {
  pagerView: DxPagerViewComponent,
  pageNumberView: DxPagerPageNumberViewComponent,
  pageNumberItemView: DxPagerPageNumberItemViewComponent,
  pageNumberFakeItemView: DxPagerPageNumberItemViewComponent,
  pageSizeView: DxPagerPageSizeViewComponent,
  pageSizeItemView: DxPagerPageSizeItemViewComponent,
}

export {PAGER_DEFAULT_VIEWS};
