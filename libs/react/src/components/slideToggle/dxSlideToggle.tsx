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

type TReactInputs<TInputs> = TInputs;
type TReactOutputs<TOutputs> = Partial<Record<keyof TOutputs, (value: TOutputs[keyof TOutputs]) => void>>;

interface IDxSlideToggleProps extends
  TReactInputs<ISlideToggleInputs>,
  TReactOutputs<ISlideToggleOutputs> {
  name?: string;
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
    contractManager.mapInputChangeToState(new SlideToggleActionUpdateStateFromInputs({
      value: props.value,
      text: props.text,
      textPosition: props.textPosition,
    }))
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