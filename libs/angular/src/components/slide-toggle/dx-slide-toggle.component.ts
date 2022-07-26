import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {DxAngularContainer, TAngularComponentConfig, TAngularInputs, TAngularOutputs} from "../../core";
import {
  SlideToggleLogicFacade,
  ISlideToggleInputs,
  ISlideToggleOutputs,
  ESlideToggleActions,
  ISlideToggleState,
  ISlideToggleViewModel,
  SlideToggleActionUpdateValue,
  SlideToggleActionUpdateStateFromInputs
} from 'dx-core';

@Component({
  selector: 'dx-slide-toggle',
  templateUrl: './dx-slide-toggle.component.html',
  styleUrls: ['./dx-slide-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: SlideToggleLogicFacade,
      useClass: SlideToggleLogicFacade,
    }
  ]
})
export class DxSlideToggleComponent
  extends DxAngularContainer<ISlideToggleOutputs, ESlideToggleActions, ISlideToggleState, ISlideToggleViewModel>
  implements
    TAngularInputs<ISlideToggleInputs>,
    TAngularOutputs<ISlideToggleOutputs>,
    OnChanges {
  @Input() value = false;
  @Input() text = '';
  @Input() textPosition: 'left' | 'right' = 'right';

  @Output() valueChanged = new EventEmitter<boolean>;

  protected componentConfig: TAngularComponentConfig<ISlideToggleOutputs, ESlideToggleActions, ISlideToggleState> = {
    getUpdateStateAction: () => new SlideToggleActionUpdateStateFromInputs(this.getStateFromInputs()),
    outputMapping: {
      valueChanged: {
        selector: (state) => state.model.value,
        callback: (value) => this.valueChanged.emit(value)
      },
    }
  }

  constructor(logicFacade: SlideToggleLogicFacade) {
    super(logicFacade);
  }

  updateValue(value: boolean): void {
    this.logicFacade.doAction(new SlideToggleActionUpdateValue(value));
  }

  protected getStateFromInputs(): ISlideToggleInputs {
    return {
      value: this.value,
      text: this.text,
      textPosition: this.textPosition,
    }
  }
}
