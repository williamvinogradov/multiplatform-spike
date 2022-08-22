import {DxSimpleGridLogic, ISimpleGridPagingVM} from '@dx/core/components/simpleGrid';
import React, {useEffect, useMemo} from 'react';
import {useAdapterViewModel, useReactContext} from '../../../common/hooks';
import {DxSimpleGridContext} from '../dxSimpleGridContext';
import {IDxPagerProps} from '../../pager/dxPagerProps';


interface IDxSimpleGridPagerProps extends IDxPagerProps {
  pagerComponent?: (props: IDxPagerProps) => JSX.Element;
}

function DxSimpleGridPagerAdapter<TData>(props: IDxSimpleGridPagerProps) {
  const logic = useReactContext(DxSimpleGridContext) as DxSimpleGridLogic<TData>;

  const adapterOutputs = useMemo(() => ({
    selectedPageChange: (selectedPage: number) => {
      logic.updatePaging({selectedPage});
      props.selectedPageChange && props.selectedPageChange(selectedPage);
    },
    selectedPageSizeChange: (selectedPageSize: number) => {
      logic.updatePaging({selectedPageSize});
      props.selectedPageSizeChange && props.selectedPageSizeChange(selectedPageSize);
    }
  }), [props]);
  const viewModel = useAdapterViewModel<ISimpleGridPagingVM, IDxPagerProps>(logic.pagingVM$, adapterOutputs);

  useEffect(() => logic.updateStateFromPagingPropsAction(props), [props]);

  return (
    <React.Fragment>
      { props.pagerComponent && props.pagerComponent(viewModel || {})}
    </React.Fragment>
  )
}

export {
  IDxSimpleGridPagerProps,
  DxSimpleGridPagerAdapter,
}
