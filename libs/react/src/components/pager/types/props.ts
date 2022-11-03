import {ModelOptions, ConfigOptions, TemplateOptions} from '@dx/core/components/pager';
import {ReactContracts} from '../../../internal';
import {
  PageNumberItemTemplate,
  PageNumberTemplate,
  PagerTemplate,
  PageSizeItemTemplate,
  PageSizeTemplate
} from './templates';

type ReactPagerContracts = ReactContracts<ModelOptions, ConfigOptions, TemplateOptions>;

interface DxPagerProps extends ReactPagerContracts {
  pagerView?: PagerTemplate;
  pageNumberView?: PageNumberTemplate;
  pageNumberItemView?: PageNumberItemTemplate;
  pageNumberFakeItemView?: PageNumberItemTemplate;
  pageSizeView?: PageSizeTemplate;
  pageSizeItemView?: PageSizeItemTemplate;
}

export type {DxPagerProps};
