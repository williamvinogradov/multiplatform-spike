import {ValidationFunc} from '../../../internal/component/validation';
import {PagerState} from './state';


const pageNumberValidator: ValidationFunc<PagerState> = (state: PagerState) => {
  const {model: {selectedPage}, dictionary: {pageCount}} = state;

  if (selectedPage <= pageCount) {
    return state;
  }

  return {
    ...state,
    model: {
      ...state.model,
      selectedPage: pageCount,
    }
  }
}

const pageSizeValidator: ValidationFunc<PagerState> = (state: PagerState) => {
  const {model: {selectedPageSize}, dictionary: {pageSizes}} = state;

  if (pageSizes.find((size) => size === selectedPageSize)) {
    return state;
  }

  return {
    ...state,
    model: {
      ...state.model,
      selectedPageSize: pageSizes[0] || 1,
    }
  }
}

export {
  pageNumberValidator,
  pageSizeValidator,
}
