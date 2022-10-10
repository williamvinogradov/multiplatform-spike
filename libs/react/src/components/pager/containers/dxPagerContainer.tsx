import React, {useContext} from 'react';
import {
  PAGER_PAGE_NUMBER_SELECTOR,
  PAGER_PAGE_SIZE_SELECTOR,
  PAGER_ROOT_TEMPLATE_SELECTOR
} from '@dx/core/components/pager';
import {useSelector} from '../../../internal';
import {PagerContext} from '../dxPagerContext';
import {PagerTemplate, PageNumberReactVM, PageSizeReactVM} from '../types/public';

const DxPagerContainer = React.memo(() => {
  const [store, callbacks] = useContext(PagerContext)!;
  // TODO: Think how these ugly casts can be removed (template from the unknown problem).
  const pageNumberViewModel = useSelector(store, PAGER_PAGE_NUMBER_SELECTOR) as PageNumberReactVM;
  const pageSizeViewModel = useSelector(store, PAGER_PAGE_SIZE_SELECTOR) as PageSizeReactVM;
  const {template} = useSelector(store, PAGER_ROOT_TEMPLATE_SELECTOR) as { template: PagerTemplate};

  const templateData = {
    data: {
      pageNumberViewModel,
      pageSizeViewModel,
      ...callbacks,
    }
  };

  return (
    template(templateData)
  )
});

export {DxPagerContainer};
