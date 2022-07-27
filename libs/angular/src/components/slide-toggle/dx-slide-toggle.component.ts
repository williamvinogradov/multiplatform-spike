import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Optional, Output} from '@angular/core';
import {
  DEFAULT_SLIDE_TOGGLE_INPUTS,
  ISlideToggleInputs,
  ISlideToggleOutputs,
  ISlideToggleState,
  SlideToggleActionUpdateStateFromInputs,
  SlideToggleContractManager,
  SlideToggleStore
} from "dx-core";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {TAngularInputs, TAngularOutputs, TOnChangeCallback, TOnTouchCallback} from "../../types";
import {Subscription} from "rxjs";


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
    OnInit,
    ControlValueAccessor {

  /* angular reactive form fields */
  private onChangeCallback: TOnChangeCallback<boolean> = () => {};
  private onTouchCallback: TOnTouchCallback = () => {};
  private stateCallbackSubscription: Subscription | null = null;
  private readonly isUsedInForm: boolean;

  @Input() value: boolean = DEFAULT_SLIDE_TOGGLE_INPUTS.value;
  @Input() text: string = DEFAULT_SLIDE_TOGGLE_INPUTS.text;
  @Input() textPosition: 'left' | 'right' = DEFAULT_SLIDE_TOGGLE_INPUTS.textPosition;

  @Output() valueChanged = new EventEmitter<boolean>;

  constructor(private contractManager: SlideToggleContractManager,
              private store: SlideToggleStore,
              @Optional() ngControl: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }

    this.isUsedInForm = !!ngControl;
  }

  ngOnInit(): void {
    this.contractManager.mapStateChangeToOutputs({
      valueChanged: {
        selector: (state: ISlideToggleState) => state.model.value,
        callback: (value: boolean) => this.valueChanged.emit(value)
      },
    });

    if (this.isUsedInForm) {
      this.initCallFormCallbacks();
    }
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

  /* Support angular reactive forms methods */
  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(onChangeCallback: TOnChangeCallback<boolean>): void {
    this.onChangeCallback = onChangeCallback;
  }

  registerOnTouched(onTouchCallback: TOnTouchCallback): void {
    this.onTouchCallback = onTouchCallback
  }

  private initCallFormCallbacks(): void {
    this.stateCallbackSubscription =
      this.store.select((state) => state.model.value)
        .subscribe((value: boolean) => {
          this.onChangeCallback(value);
          this.onTouchCallback();
        });
  }
}
