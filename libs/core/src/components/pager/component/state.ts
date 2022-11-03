import {StateValue} from '../../../internal';
import {ConfigOptions, ModelOptions, TemplateOptions} from '../types';


interface PagerModel extends ModelOptions {}
interface PagerDictionary extends ConfigOptions, TemplateOptions {}
interface PagerState extends StateValue<PagerModel, PagerDictionary> {}

const PAGER_DEFAULT_PAGE_SIZES = [20, 40];
const PAGER_DEFAULT_STATE: PagerState = {
  model: {
    selectedPage: 1,
    selectedPageSize: PAGER_DEFAULT_PAGE_SIZES[0]
  },
  dictionary: {
    pageCount: 1,
    pageSizes: PAGER_DEFAULT_PAGE_SIZES,
    // pager.
    pagerView: null,
    // page number.
    pageNumberView: null,
    pageNumberItemView: null,
    pageNumberFakeItemView: null,
    // page size.
    pageSizeView: null,
    pageSizeItemView: null,
  },
}

export type {
  PagerModel,
  PagerDictionary,
  PagerState
};
export {PAGER_DEFAULT_PAGE_SIZES, PAGER_DEFAULT_STATE};
