import {createSelector} from '../../../../../internal';
import {getParams, pageNumberSelector} from './selector';

const PAGER_PAGE_NUMBER_SELECTOR = createSelector(
  getParams,
  pageNumberSelector,
);

export {PAGER_PAGE_NUMBER_SELECTOR};
export * from './types';
