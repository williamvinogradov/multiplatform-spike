import React, {useEffect, useState} from "react";
import {
  getSlideToggleIndicatorVM,
  ISlideToggleIndicatorVM,
  SlideToggleStore
} from "@dx/core/components/slideToggle";

import {DxSlideToggleContext} from "../dxSlideToggleContext";
import {DxSlideToggleIndicatorView} from "../views/dxSlideToggleIndicatorView";
import {useReactContext} from "../../../utils";


function DxSlideToggleIndicatorContainer() {
  const store = useReactContext<SlideToggleStore>(DxSlideToggleContext);
  const [viewModel, setViewModel] = useState<ISlideToggleIndicatorVM>();

  // init
  useEffect(() => {
    const subscription = store.getViewModel(
      (state) => ({
        value: state.model.value,
        textPosition: state.viewData.textPosition,
      }),
      getSlideToggleIndicatorVM,
    ).subscribe(setViewModel);

    // destroy
    return () => {
      subscription.unsubscribe();
    }
  }, []);

  return <DxSlideToggleIndicatorView viewModel={viewModel} />
}

export {DxSlideToggleIndicatorContainer}