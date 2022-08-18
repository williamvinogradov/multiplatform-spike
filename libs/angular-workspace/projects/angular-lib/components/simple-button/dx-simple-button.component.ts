import {ChangeDetectionStrategy, Component, Input, OnChanges} from '@angular/core';
import {DxSimpleButtonLogic, SimpleButtonState} from '@dx/core/components/simpleButton';
import {ISimpleButtonState, SIMPLE_BUTTON_DEFAULT_STATE} from '@dx/core/types/simpleButton';
import {TAngularInputs} from '@dx/angular-common';


@Component({
  selector: 'dx-simple-button',
  templateUrl: './dx-simple-button.component.html',
  styleUrls: ['./dx-simple-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: SimpleButtonState, useClass: SimpleButtonState },
    {
      provide: DxSimpleButtonLogic,
      useFactory: (state: SimpleButtonState) => new DxSimpleButtonLogic(state),
      deps: [SimpleButtonState],
    }
  ]
})
export class DxSimpleButtonComponent implements
  OnChanges,
  TAngularInputs<ISimpleButtonState> {

  @Input()
  text = SIMPLE_BUTTON_DEFAULT_STATE.text;

  viewModel$ = this.logic.viewModel$;

  constructor(private logic: DxSimpleButtonLogic) { }

  ngOnChanges(): void {
    this.logic.updateStateFromProps({
      text: this.text,
    });
  }
}
