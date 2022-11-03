import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnChanges,
  OnInit,
  Optional,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {
 createSlideToggleCore, RootSlideToggleCore
} from '@dx/core/components/slideToggle';
import {
  SLIDE_TOGGLE_CONTEXT_TOKEN,
  SlideToggleContext,
  slideToggleContextFactory
} from './context';
import {inputsToModel, inputsToDictionary} from './mappers';
import {DxSlideToggleInputs} from './types';


@Component({
  selector: 'dx-slide-toggle',
  template: `
    <dx-slide-toggle-container>
    </dx-slide-toggle-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: SLIDE_TOGGLE_CONTEXT_TOKEN,
    useFactory: slideToggleContextFactory,
  }],
})
export class DxSlideToggleComponent extends DxSlideToggleInputs
  implements OnInit, OnChanges {

  private rootCore?: RootSlideToggleCore;

  constructor(@Inject(SLIDE_TOGGLE_CONTEXT_TOKEN) private contextContainer: SlideToggleContext,
              @Optional() ngControl: NgControl) {
    super(ngControl);
  }

  ngOnInit(): void {
    const [rootCore, containerCore] = createSlideToggleCore(
      {
        model: inputsToModel(this),
        dictionary: inputsToDictionary(this),
      },
      {
        value: {
          isControlled: false,
          publicCallback: (value: boolean) => {
            this.updateFormValue(value);
            this.valueChange.emit(value);
          },
        }
      }
    );

    this.rootCore = rootCore;
    this.contextContainer.context = containerCore;
  }

  ngOnChanges(): void {
    this.updateStateFromInputs();
  }

  protected updateStateFromInputs(): void {
    this.rootCore?.updateState({
      model: inputsToModel(this),
      dictionary: inputsToDictionary(this),
    });
    this.rootCore?.completeUpdate();
  }

  /* Support angular reactive forms methods */
  writeValue(value: boolean): void {
    this.value = value;
    this.updateStateFromInputs();
  }
}
