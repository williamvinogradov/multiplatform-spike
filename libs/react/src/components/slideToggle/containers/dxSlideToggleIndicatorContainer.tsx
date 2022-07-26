import React, {useEffect, useState} from "react";
import {DxSlideToggleContext} from "../dxSlideToggleContext";
import {getSlideToggleIndicatorVM, ISlideToggleIndicatorVM, SlideToggleStore} from "dx-core";
import {DxSlideToggleIndicatorView} from "../views/dxSlideToggleIndicatorView";
import {getContext} from "../../../utils";


function DxSlideToggleIndicatorContainer() {
  const store = getContext<SlideToggleStore>(DxSlideToggleContext);
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