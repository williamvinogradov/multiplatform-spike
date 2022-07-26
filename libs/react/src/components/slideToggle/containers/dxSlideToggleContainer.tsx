import React, {useCallback, useEffect, useState} from "react";
import {getRootContainerVM, IRootContainerVM, SlideToggleActionUpdateValue, SlideToggleStore} from "dx-core";
import {DxSlideToggleContext} from '../dxSlideToggleContext';
import {DxSlideToggleIndicatorContainer} from "./dxSlideToggleIndicatorContainer";
import {DxSlideToggleTextContainer} from "./dxSlideToggleTextContainer";
import {getContext} from "../../../utils";


function DxSlideToggleContainer() {
  const store = getContext<SlideToggleStore>(DxSlideToggleContext);
  const [viewModel, setViewModel] = useState<IRootContainerVM>();

  const updateValue = useCallback(() => {
    store.doAction(new SlideToggleActionUpdateValue(!viewModel?.value))
  }, [viewModel]);

  // init
  useEffect(() => {
    const subscribe = store.getViewModel(
      (state) => ({
        value: state.model.value,
        textPosition: state.viewData.textPosition,
      }),
      getRootContainerVM,
    ).subscribe(setViewModel);

    // destroy
    return () => {
      subscribe.unsubscribe();
    }
  }, []);

  return (
    <div className={'dx-slide-toggle ' + viewModel?.textPosition === 'left' ? '-left' : 'right'}
         onClick={updateValue}>
      <DxSlideToggleIndicatorContainer />
      <DxSlideToggleTextContainer />
    </div>
  )
}

export {DxSlideToggleContainer};