import React, {memo, useEffect, useState} from "react";
import {Action, LogicFacade, TOutputMapping} from "dx-core";

type TReactInputs<TInputs> = Partial<TInputs>;
type TReactOutputs<TOutputs> = Partial<Record<keyof TOutputs, (value: TOutputs[keyof TOutputs]) => void>>
type TReactProps<TInputs, TOutputs> = TReactInputs<TInputs> & TReactOutputs<TOutputs>;

type TReactComponentConfig<TOutputs, TUpdateAction extends string, TState> = {
  getUpdateStateAction(): Action<TUpdateAction>,
  outputMapping: TOutputMapping<TOutputs, TState>;
}

function DxContainerComponent<TInputs, TOutputs, TActionTypes extends string, TState, TViewModel>(
  props: TReactProps<TInputs, TOutputs>,
  logicFacade: LogicFacade<TOutputs, TActionTypes, TState, TViewModel>,
  componentConfig: TReactComponentConfig<TOutputs, TActionTypes, TState>,
  renderFunc: (viewModel: TViewModel) => JSX.Element,
) {
  const [viewModel, setViewModel] = useState<TViewModel>();

  useEffect(() => {
    console.log('init effect!');
    const { outputMapping } = componentConfig;
    logicFacade.mapStateChangeToOutputs(outputMapping);

    const viewModelSubscription = logicFacade.viewModel$.subscribe((viewModel: TViewModel) => {
      console.log('set vm: ', viewModel);
      setViewModel(viewModel);
    });

    return () => {
      console.log('destroy');
      viewModelSubscription.unsubscribe();
      logicFacade.destroy();
    }
  }, []);

  useEffect(() => {
    console.log('effect on props');
    const { getUpdateStateAction } = componentConfig;
    logicFacade.doAction(getUpdateStateAction());
  }, [props]);

  return viewModel ? renderFunc(viewModel) : <div></div>;
}

export { DxContainerComponent, TReactProps }
