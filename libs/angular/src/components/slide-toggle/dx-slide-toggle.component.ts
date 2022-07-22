import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {Observable} from "rxjs";
import {
  ESlideToggleActions,
  ISlideToggleUpdateStateFromPropsAction, ISlideToggleUpdateValueAction,
  ISlideToggleViewModel,
  SlideToggleStore
} from "@dx/core";
import {ISlideToggleInputs} from "@dx/core/src/components/slideToggle/props/props";

@Component({
  selector: 'dx-slide-toggle',
  templateUrl: './dx-slide-toggle.component.html',
  styleUrls: ['./dx-slide-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: SlideToggleStore,
      useClass: SlideToggleStore,
    }
  ]
})
export class DxSlideToggleComponent implements ISlideToggleInputs, OnChanges {
  @Input() value = false;
  @Input() text = '';
  @Input() textPosition: 'left' | 'right' = 'right';

  @Output() valueChanged = new EventEmitter<boolean>;

  viewModel$: Observable<ISlideToggleViewModel> = this.store.viewModel$;

  constructor(private store: SlideToggleStore) {
    this.store.initOutputs({
      valueChanged: (result) => this.valueChanged.emit(result)
    });
  }

  ngOnChanges(): void {
    console.log('on changes');
    this.store.doAction({
      id: ESlideToggleActions.updateStateFromProps,
      inputProps: {
        value: this.value,
        text: this.text,
        textPosition: this.textPosition,
      }
    } as ISlideToggleUpdateStateFromPropsAction)
  }

  updateValue(value: boolean): void {
    this.store.doAction({
      id: ESlideToggleActions.updateValue,
      value,
    } as ISlideToggleUpdateValueAction);
  }
}
