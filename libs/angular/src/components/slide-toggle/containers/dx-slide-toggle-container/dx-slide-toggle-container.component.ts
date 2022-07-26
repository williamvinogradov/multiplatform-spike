import {ChangeDetectionStrategy, Component} from '@angular/core';
import {getRootContainerVM, IRootContainerVM, SlideToggleActionUpdateValue, SlideToggleStore} from "dx-core";
import {Observable} from "rxjs";

@Component({
  selector: 'dx-slide-toggle-container',
  templateUrl: './dx-slide-toggle-container.component.html',
  styleUrls: ['./dx-slide-toggle-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxSlideToggleContainerComponent {

  viewModel$: Observable<IRootContainerVM> = this.store.getViewModel(
    (state) => ({
      value: state.model.value,
      textPosition: state.viewData.textPosition,
    }),
    getRootContainerVM,
  )

  constructor(private store: SlideToggleStore) { }

  updateValue(newValue: boolean): void {
    this.store.doAction(new SlideToggleActionUpdateValue(newValue));
  }
}
