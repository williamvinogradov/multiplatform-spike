import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges} from '@angular/core';
import {
  SimpleButtonStore,
  ISimpleButtonInputs,
  SimpleButtonActionUpdateStateFromInputs,
  SIMPLE_BUTTON_DEFAULT_INPUTS,
  ISimpleButtonVM,
} from '@dx/core/components/simpleButton';
import {Observable} from "rxjs";

type TAngularInputs<TInputs> = Partial<TInputs>;
type TAngularOutputs<TOutputs> = Record<keyof TOutputs, EventEmitter<TOutputs[keyof TOutputs]>>

/* reactive forms */
type TOnChangeCallback<TControlValue> = (value: TControlValue) => void;
type TOnTouchCallback = () => void;


@Component({
  selector: 'dx-simple-button',
  templateUrl: './dx-simple-button.component.html',
  styleUrls: ['./dx-simple-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: SimpleButtonStore,
      useClass: SimpleButtonStore,
    }
  ]
})
export class DxSimpleButtonComponent implements
  OnChanges,
  TAngularInputs<ISimpleButtonInputs>{

  @Input()
  text = SIMPLE_BUTTON_DEFAULT_INPUTS.text;

  viewModel$: Observable<ISimpleButtonVM> = this.store.select(({text}) => ({text}));

  constructor(private store: SimpleButtonStore) { }

  ngOnChanges(): void {
    this.store.doAction(new SimpleButtonActionUpdateStateFromInputs({
      text: this.text,
    }));
  }
}
