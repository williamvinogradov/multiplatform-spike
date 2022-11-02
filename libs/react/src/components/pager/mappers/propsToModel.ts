import {PagerModel} from '@dx/core/components/pager';
import {DxPagerProps} from '../types';

const pageNumberPropsToModel = (props: DxPagerProps, isControlled: boolean): Partial<PagerModel> => {
  const result: Partial<PagerModel> = {}

  isControlled && props.selectedPage !== undefined && (result.selectedPage = props.selectedPage);
  !isControlled && props.defaultSelectedPage !== undefined && (result.selectedPage = props.defaultSelectedPageSize);

  return result;
};

const pageSizePropsToModel = (props: DxPagerProps, isControlled: boolean): Partial<PagerModel> => {
  const result: Partial<PagerModel> = {};

  isControlled && props.selectedPageSize !== undefined && (result.selectedPageSize = props.selectedPageSize);
  !isControlled && props.defaultSelectedPageSize !== undefined && (result.selectedPageSize = props.defaultSelectedPageSize);

  return result;
};

export {pageNumberPropsToModel, pageSizePropsToModel};
