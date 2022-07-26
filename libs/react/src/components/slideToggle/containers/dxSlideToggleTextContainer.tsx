import {DxSlideToggleTextView} from "../views/dxSlideToggleTextView";
import React, {useEffect, useState} from "react";
import {getSlideToggleTextVM, ISlideToggleTextVM, SlideToggleStore} from "dx-core";
import {DxSlideToggleContext} from "../dxSlideToggleContext";
import {getContext} from "../../../utils";


function DxSlideToggleTextContainer() {
  const store = getContext<SlideToggleStore>(DxSlideToggleContext);
  const [viewModel, setViewModel] = useState<ISlideToggleTextVM>();

  // init
  useEffect(() => {
    const subscription = store.getViewModel(
      (state) => state.viewData.text,
      getSlideToggleTextVM,
    ).subscribe(setViewModel);

    // destroy
    return () => {
      subscription.unsubscribe();
    }
  }, []);

  return <DxSlideToggleTextView viewModel={viewModel} />
}

export {DxSlideToggleTextContainer}