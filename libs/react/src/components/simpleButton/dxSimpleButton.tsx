import {
  ISimpleButtonInputs, ISimpleButtonVM, SIMPLE_BUTTON_DEFAULT_INPUTS,
  SimpleButtonActionUpdateStateFromInputs,
  SimpleButtonStore
} from "@dx/core/components/simpleButton";

import './dxSimpleButton.scss';

import {TReactInputs} from "../../common";
import React, {useEffect, useMemo, useState} from "react";


interface IDxSimpleButtonProps extends TReactInputs<ISimpleButtonInputs> {}

function DxSimpleButton(props: IDxSimpleButtonProps) {
  const store = useMemo(() => new SimpleButtonStore(), []);
  const [viewModel, setViewModel] = useState<ISimpleButtonVM>();

  // init
  useEffect(() => {
    const subscribe = store.select(({text}) => ({text}))
      .subscribe((viewModel) => setViewModel(viewModel));

    return () => subscribe.unsubscribe();
  }, []);

  // props changes
  useEffect(() => {
    store.doAction(new SimpleButtonActionUpdateStateFromInputs({
      text: props.text
    }))
  }, [props]);

  return (<button className="dx-simple-button">{viewModel?.text}</button>)
}

DxSimpleButton.defaultProps = SIMPLE_BUTTON_DEFAULT_INPUTS;

export { DxSimpleButton };