import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output, TemplateRef,
} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {TAngularInputs, TAngularOutputs, TOnChangeCallback, TOnTouchCallback} from '@dx/angular-common';
import {DxSlideToggleLogic, DxSlideToggleOutputs, SlideToggleState} from '@dx/core/components/slideToggle';
import {ISlideToggleOutputs, ISlideToggleState, SLIDE_TOGGLE_DEFAULT_STATE} from '@dx/core/types/slideToggle';
import {Subject, takeUntil} from 'rxjs';


@Component({
  selector: 'dx-slide-toggle',
  templateUrl: './dx-slide-toggle.component.html',
  styleUrls: ['./dx-slide-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: SlideToggleState, useClass: SlideToggleState },
    {
      provide: DxSlideToggleLogic,
      useFactory: (state: SlideToggleState) => new DxSlideToggleLogic(state),
      deps: [SlideToggleState]
    },
    {
      provide: DxSlideToggleOutputs,
      useFactory: (state: SlideToggleState) => new DxSlideToggleOutputs(state),
      deps: [SlideToggleState]
    },
  ],
})
export class DxSlideToggleComponent
  implements
    TAngularInputs<ISlideToggleState>,
    TAngularOutputs<ISlideToggleOutputs>,
    OnInit,
    ControlValueAccessor {
  @Input() value = SLIDE_TOGGLE_DEFAULT_STATE.value;
  @Input() text = SLIDE_TOGGLE_DEFAULT_STATE.text;
  @Input() textPosition = SLIDE_TOGGLE_DEFAULT_STATE.textPosition;
  @Input() indicatorView?: TemplateRef<unknown>;
  @Input() textView?: TemplateRef<unknown>;

  @Output() valueChange = new EventEmitter<boolean>;

  viewModel$ = this.logic.viewModel$;

  /* angular reactive form fields */
  private onChangeCallback?: TOnChangeCallback<boolean> = () => {};
  private onTouchCallback?: TOnTouchCallback = () => {};

  private readonly destroy = new Subject<void>();

  constructor(private logic: DxSlideToggleLogic,
              private outputs: DxSlideToggleOutputs,
              @Optional() ngControl: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.outputs.outputs$.valueChange
      .pipe(takeUntil(this.destroy))
      .subscribe((value) => {
        this.valueChange.emit(value);
        this.onChangeCallback && this.onChangeCallback(value);
        this.onTouchCallback && this.onTouchCallback();
      });
  }

  ngOnChanges(): void {
    this.logic.updateStateFromPropsAction({
      value: this.value,
      text: this.text,
      textPosition: this.textPosition,
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  updateValue(newValue: boolean): void {
    this.logic.updateValueAction(newValue);
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
}
