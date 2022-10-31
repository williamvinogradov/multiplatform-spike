import {PagerContractModels, PagerContractConfigs, PagerContractTemplates} from '@dx/core/components/pager';
import {ReactProps} from '../../../../internal';
import {
  PageNumberItemTemplate,
  PageNumberTemplate,
  PagerTemplate,
  PageSizeItemTemplate,
  PageSizeTemplate
} from './templates';

type ReactPagerContracts = Partial<PagerContractModels & PagerContractConfigs & PagerContractTemplates> &
ReactProps<PagerContractModels>;

interface DxPagerProps extends ReactPagerContracts {
  pagerView?: PagerTemplate;
  pageNumberView?: PageNumberTemplate;
  pageNumberItemView?: PageNumberItemTemplate;
  pageNumberFakeItemView?: PageNumberItemTemplate;
  pageSizeView?: PageSizeTemplate;
  pageSizeItemView?: PageSizeItemTemplate;
}

export type {DxPagerProps};
