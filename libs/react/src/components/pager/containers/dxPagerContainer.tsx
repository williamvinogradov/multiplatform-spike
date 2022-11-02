import React, {useContext, useMemo} from 'react';
import {
  SelectPageAction,
  SelectPageSizeAction,
  PageNumberVM,
  PageSizeVM,
  RootTemplateVM,
} from '@dx/core/components/pager';
import {useViewModel} from '../../../internal';
import { PagerContext } from '../dxPagerContext';
import {PageNumberReactVM, PageSizeReactVM, RootTemplateReactVM} from '../types';

//* Component={"name":"DxPagerContainer"}
// TODO inferno isn't support React.memo(
export function DxPagerContainer() {
  const core = useContext(PagerContext)!;
  const pageNumberViewModel = useViewModel<PageNumberVM, PageNumberReactVM>(core.viewModels.pageNumber);
  const pageSizeViewModel = useViewModel<PageSizeVM, PageSizeReactVM>(core.viewModels.pageSize);
  const rootTemplate = useViewModel<RootTemplateVM, RootTemplateReactVM>(core.viewModels.rootTemplate);

  const selectedPageChange = useMemo(() => (pageNumber: number) => {
    core.dispatch(new SelectPageAction(pageNumber))
  }, []);
  const selectedPageSizeChange = useMemo(() => (pageSize: number) => {
    core.dispatch(new SelectPageSizeAction(pageSize))
  }, []);


  const { template } = rootTemplate;
  const templateData = {
    data: {
      pageNumberViewModel,
      pageSizeViewModel,
      selectedPageChange,
      selectedPageSizeChange
    }
  };

  return (
    template(templateData)
  )
}
//);
