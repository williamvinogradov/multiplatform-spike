import React, {useEffect, useMemo} from 'react';
import {DxSimpleGridLogic, SimpleGridState} from '@dx/core/components/simpleGrid';
import {ISimpleGridInputs, getDefaultSimpleGridState} from '@dx/core/types/simpleGrid';
import {DxSimpleGridContext} from './dxSimpleGridContext';
import {DxSimpleGridTableContainer} from './containers/dxSimpleGridTableContainer';

interface IDxSimpleGridProps<TData>
  extends ISimpleGridInputs<TData> {
  children: React.ReactNode
}

function DxSimpleGrid<TData>(props: IDxSimpleGridProps<TData>) {
  const state = useMemo(() => new SimpleGridState<TData>(getDefaultSimpleGridState()), []);
  const logic = useMemo(() => new DxSimpleGridLogic(state), []);

  useEffect(() => logic.updateStateFromPropsAction({
    data: props.data,
    columns: props.columns,
  }), [props]);

  return (
    <DxSimpleGridContext.Provider value={logic}>
      <DxSimpleGridTableContainer<TData> />
      <div>
        {props.children}
      </div>
    </DxSimpleGridContext.Provider>
  )
}

export {DxSimpleGrid}
