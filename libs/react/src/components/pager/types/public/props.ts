import {PagerContractModels, PagerContractConfigs, PagerContractTemplates} from '@dx/core/components/pager';
import {ReactProps} from '../../../../internal';
import {
  PageNumberItemTemplate,
  PageNumberTemplate,
  PagerTemplate,
  PageSizeItemTemplate,
  PageSizeTemplate
} from './templates';
interface DxPagerProps extends ReactProps<Partial<PagerContractModels & PagerContractConfigs & PagerContractTemplates>, keyof PagerContractModels> {
  pagerView?: PagerTemplate;
  pageNumberView?: PageNumberTemplate;
  pageNumberItemView?: PageNumberItemTemplate;
  pageNumberFakeItemView?: PageNumberItemTemplate;
  pageSizeView?: PageSizeTemplate;
  pageSizeItemView?: PageSizeItemTemplate;
}

export type {DxPagerProps};
