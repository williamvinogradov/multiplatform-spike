import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {Observable, Subject, takeUntil} from 'rxjs';
import {
  TAngularContracts,
  FormControlComponent,
  TAngularTemplate,
} from '@dx/angular-common';
import {DxSlideToggleCore, ISlideToggleState, SLIDE_TOGGLE_DEFAULT_STATE} from '@dx/core/components/slideToggle';
import {TSlideInputContractsConfig} from '@dx/core/types/slideToggle';
import {
  DxSlideToggleTextViewComponent,
  DxSlideToggleIndicatorViewComponent, DxSlideToggleIndicatorViewContracts, DxSlideToggleTextViewContracts,
} from './views';


@Component({
  selector: 'dx-slide-toggle',
  template: `
    <dx-slide-toggle-template *ngIf="viewModel$ | async as viewModel"
                              [viewModel]="viewModel"
                              (updateValue)="updateValue($event)">
    </dx-slide-toggle-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DxSlideToggleCore],
})
export class DxSlideToggleComponent
  extends FormControlComponent<boolean>
  implements TAngularContracts<TSlideInputContractsConfig>, OnInit, OnChanges {
  // inputs.
  @Input() value = SLIDE_TOGGLE_DEFAULT_STATE.value;
  @Input() text = SLIDE_TOGGLE_DEFAULT_STATE.config.text;
  @Input() textPosition = SLIDE_TOGGLE_DEFAULT_STATE.config.textPosition;
  // customization section.
  @Input() indicatorViewTemplate: TAngularTemplate<DxSlideToggleIndicatorViewContracts> = DxSlideToggleIndicatorViewComponent;
  @Input() textViewTemplate: TAngularTemplate<DxSlideToggleTextViewContracts> = DxSlideToggleTextViewComponent;
  // outputs.
  @Output() valueChange = new EventEmitter<boolean>;

  readonly viewModel$: Observable<ISlideToggleState> = this.component.viewModel$;

  private readonly destroy = new Subject<void>();

  constructor(private component: DxSlideToggleCore,
              private cdr: ChangeDetectorRef,
              @Optional() ngControl: NgControl) {
    super(ngControl);
  }

  ngOnInit(): void {
    this.component.valueChangeOutput$
      .pipe(takeUntil(this.destroy))
      .subscribe((value: boolean) => {
        this.valueChange.emit(value);
        this.updateFormValue(value);
      });
  }

  ngOnChanges(): void {
    this.updateStateFromProps();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  updateValue(newValue: boolean): void {
    this.component.updateValue(newValue);
  }

  protected updateStateFromProps(): void {
    this.component.updateStateFromProps({
      value: this.value,
      config: {
        text: this.text,
        textPosition: this.textPosition
      },
      templates: {
        indicatorView: this.indicatorViewTemplate,
        textView: this.textViewTemplate,
      }
    });
  }

  /* Support angular reactive forms methods */
  writeValue(value: boolean): void {
    this.value = value;
    this.updateStateFromProps();
  }
}
