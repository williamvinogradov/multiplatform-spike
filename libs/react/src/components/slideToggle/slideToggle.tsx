import React, {useMemo} from "react";
import {DxContainerComponent, TReactProps} from "../../core";
import {
  DEFAULT_SLIDE_TOGGLE_INPUTS,
  ESlideToggleActions,
  ISlideToggleInputs,
  ISlideToggleOutputs,
  ISlideToggleState,
  ISlideToggleViewModel,
  SlideToggleActionUpdateStateFromInputs, SlideToggleActionUpdateValue,
  SlideToggleLogicFacade
} from "dx-core";
import {SlideToggleIndicatorView} from "./views/slideToggleIndicatorView";
import {SlideToggleTextView} from "./views/slideToggleTextView";

interface IDxSlideToggleProps extends TReactProps<ISlideToggleInputs, ISlideToggleOutputs> {}

function DxSlideToggle(props: IDxSlideToggleProps) {
  const logicFacade = useMemo(() => new SlideToggleLogicFacade(), []);
  const fullProps = {
    ...DEFAULT_SLIDE_TOGGLE_INPUTS,
    ...props,
  };

  const handleClick = (value: boolean) => () => {
    logicFacade.doAction(new SlideToggleActionUpdateValue(value));
  }

  return DxContainerComponent<
    ISlideToggleInputs,
    ISlideToggleOutputs,
    ESlideToggleActions,
    ISlideToggleState,
    ISlideToggleViewModel>(
      props,
    logicFacade,
    {
      getUpdateStateAction() {
        return new SlideToggleActionUpdateStateFromInputs(fullProps);
      },
      outputMapping:{
        valueChanged: {
          selector: (state) => state.model.value,
          callback: (value) => {
            if (props.valueChanged) {
              props.valueChanged(value);
            }
          },
        },
      }
    },
    (viewModel) =>
      <div onClick={handleClick(!viewModel.value)}
      className={'dx-slide-toggle ' + viewModel.textPosition === 'left' ? '-left' : '-right'}>
        <div className={'dx-slide-toggle__indicator ' + viewModel.textPosition === 'left' ? '-right' : '-left'}>
          <SlideToggleIndicatorView value={viewModel.value} />
        </div>
        <SlideToggleTextView text={viewModel.text} />
      </div>
  );
}

export { DxSlideToggle }