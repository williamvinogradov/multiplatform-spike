import {Component, EventEmitter, OnChanges, OnDestroy, OnInit} from "@angular/core";
import {Action, LogicFacade, TOutputMapping} from "dx-core";
import {Observable} from "rxjs";

type TAngularInputs<TInputs> = TInputs;
type TAngularOutputs<TOutputs> = Record<keyof TOutputs, EventEmitter<TOutputs[keyof TOutputs]>>
type TAngularComponentConfig<TOutputs, TUpdateAction extends string, TState> = {
  getUpdateStateAction(): Action<TUpdateAction>,
  outputMapping: TOutputMapping<TOutputs, TState>;
}

@Component({
  template: '',
  selector: 'dx-container',
})
abstract class DxAngularContainer<TOutputs, TActionTypes extends string, TState, TViewModel>
 implements OnInit, OnChanges, OnDestroy {

  protected abstract componentConfig: TAngularComponentConfig<TOutputs, TActionTypes, TState>;

  viewModel$: Observable<TViewModel>;

  protected constructor(protected logicFacade: LogicFacade<TOutputs, TActionTypes, TState, TViewModel>) {
    this.viewModel$ = this.logicFacade.viewModel$;
  }

  ngOnInit(): void {
    const { outputMapping } = this.componentConfig;
    this.logicFacade.mapStateChangeToOutputs(outputMapping);
  }

  ngOnChanges(): void {
    const { getUpdateStateAction } = this.componentConfig;
    console.log('update state action: ', getUpdateStateAction());
    this.logicFacade.doAction(getUpdateStateAction())
  }

  ngOnDestroy(): void {
    this.logicFacade.destroy();
  }
}

export {
  TAngularInputs,
  TAngularOutputs,
  TAngularComponentConfig,
  DxAngularContainer,
}
