import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  DEFAULT_SLIDE_TOGGLE_INPUTS,
  ISlideToggleInputs,
  ISlideToggleOutputs,
  ISlideToggleState,
  SlideToggleActionUpdateStateFromInputs,
  SlideToggleContractManager,
  SlideToggleStore
} from "dx-core";

type TAngularInputs<TInputs> = Partial<TInputs>;
type TAngularOutputs<TOutputs> = Record<keyof TOutputs, EventEmitter<TOutputs[keyof TOutputs]>>

@Component({
  selector: 'dx-slide-toggle',
  templateUrl: './dx-slide-toggle.component.html',
  styleUrls: ['./dx-slide-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: SlideToggleStore,
      useClass: SlideToggleStore,
    },
    {
      provide: SlideToggleContractManager,
      useFactory: (store: SlideToggleStore) => new SlideToggleContractManager(store),
      deps: [SlideToggleStore],
    }],
})
export class DxSlideToggleComponent
  implements
    TAngularInputs<ISlideToggleInputs>,
    TAngularOutputs<ISlideToggleOutputs>,
    OnInit {

  @Input() value: boolean = DEFAULT_SLIDE_TOGGLE_INPUTS.value;
  @Input() text: string = DEFAULT_SLIDE_TOGGLE_INPUTS.text;
  @Input() textPosition: 'left' | 'right' = DEFAULT_SLIDE_TOGGLE_INPUTS.textPosition;

  @Output() valueChanged = new EventEmitter<boolean>;

  constructor(private contractManager: SlideToggleContractManager) { }

  ngOnInit(): void {
    this.contractManager.mapStateChangeToOutputs({
      valueChanged: {
        selector: (state: ISlideToggleState) => state.model.value,
        callback: (value: boolean) => this.valueChanged.emit(value)
      },
    });
  }

  ngOnChanges(): void {
    this.contractManager.mapInputChangeToState(new SlideToggleActionUpdateStateFromInputs({
      value: this.value,
      text: this.text,
      textPosition: this.textPosition,
    }));
  }

  ngOnDestroy(): void {
    this.contractManager.destroy();
  }
}
