import {DxPagerCore} from '@dx/core/components/pager';
import {useEffect} from 'react';

import {IDxPagerProps} from '../types';

function useUpdateFromProps(
  component: DxPagerCore,
  props: IDxPagerProps,
  isPageNumberControlled: boolean,
  isPageSizeControlled: boolean,
): void {
  useEffect(() => {
    component.updateRootTemplate(props.pagerTemplate);
  }, [props.pagerTemplate]);

  useEffect(() => {
    component.pageNumberLogic.updateFromProps({
      count: props.pageCount,
      templates: {
        general: props.pageNumberTemplate,
        item: props.pageNumberItemTemplate,
        fakeItem: props.pageNumberFakeItemTemplate,
      }
    }, !isPageNumberControlled)
  }, [props.pageCount, props.pageNumberItemTemplate, props.pageNumberItemTemplate]);

  useEffect(() => {
    component.pageSizeLogic.updateFromProps({
      sizes: props.pageSizes,
      templates: {
        general: props.pageSizeTemplate,
        item: props.pageSizeItemTemplate,
      }
    }, !isPageSizeControlled)
  }, [props.pageSizes, props.pageSizeTemplate, props.pageSizeItemTemplate]);
}

export {useUpdateFromProps};
