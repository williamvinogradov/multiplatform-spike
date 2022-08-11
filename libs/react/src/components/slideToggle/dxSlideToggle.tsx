import React, {useEffect, useMemo} from "react";
import {
  DEFAULT_SLIDE_TOGGLE_INPUTS,
  ISlideToggleInputs,
  ISlideToggleOutputs,
  SlideToggleContractManager,
  SlideToggleActionUpdateStateFromInputs,
  SlideToggleStore
} from "@dx/core/components/slideToggle";

import {DxSlideToggleContext} from "./dxSlideToggleContext";
import {DxSlideToggleContainer} from "./containers/dxSlideToggleContainer";
import {TReactInputs, TReactOutputs} from "../../common";

interface IDxSlideToggleProps extends
  TReactInputs<ISlideToggleInputs>,
  TReactOutputs<ISlideToggleOutputs> {
}


function DxSlideToggle(props: IDxSlideToggleProps) {
  const store = useMemo(() => new SlideToggleStore(), []);
  const contractManager = useMemo(() => new SlideToggleContractManager(store), []);

  // init
  useEffect(() => {
    contractManager.mapStateChangeToOutputs({
      valueChanged: {
        selector: (state) => state.model.value,
        callback: (value: boolean) => props.valueChanged ? props.valueChanged(value) : undefined,
      }
    })

    // destroy
    return () => {
      contractManager.destroy();
    };
  }, []);

  // props changes
  useEffect(() => {
    store.doAction(new SlideToggleActionUpdateStateFromInputs({
      value: props.value,
      text: props.text,
      textPosition: props.textPosition,
    }));
  }, [props]);

  return (
    <DxSlideToggleContext.Provider value={store} >
      <DxSlideToggleContainer />
    </DxSlideToggleContext.Provider>
  )
}

DxSlideToggle.defaultProps = DEFAULT_SLIDE_TOGGLE_INPUTS;

export {
  IDxSlideToggleProps,
  DxSlideToggle,
}