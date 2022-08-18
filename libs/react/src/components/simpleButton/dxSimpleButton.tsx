import React, {useEffect, useMemo} from "react";
import {DxSimpleButtonLogic, SimpleButtonState} from '@dx/core/components/simpleButton';
import {useViewModel} from '../../common/hooks';
import {IDxSimpleButtonProps} from './dxSimpleButtonProps';

import './dxSimpleButton.scss';


function DxSimpleButton(props: IDxSimpleButtonProps) {
  const state = useMemo(() => new SimpleButtonState(), []);
  const logic = useMemo(() => new DxSimpleButtonLogic(state), []);

  const viewModel = useViewModel(logic.viewModel$);

  useEffect(() => {
    logic.updateStateFromProps(props);
  }, [props])

  return (
    <React.Fragment>
      {viewModel && <button className="dx-simple-button">{viewModel.text}</button>}
    </React.Fragment>
  )
}

export {
  DxSimpleButton,
}
