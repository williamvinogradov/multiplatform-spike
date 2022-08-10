import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
  getSlideToggleIndicatorVM,
  ISlideToggleIndicatorVM,
  SlideToggleStore
} from "@dx/core/components/slideToggle";
import {Observable} from "rxjs";

@Component({
  selector: 'dx-slide-toggle-indicator-container',
  templateUrl: './dx-slide-toggle-indicator-container.component.html',
  styleUrls: ['./dx-slide-toggle-indicator-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxSlideToggleIndicatorContainerComponent {

  viewModel$: Observable<ISlideToggleIndicatorVM> = this.store.getViewModel(
    (state) => ({
        value: state.model.value,
        textPosition: state.viewData.textPosition,
      }),
    getSlideToggleIndicatorVM,
  );

  constructor(private store: SlideToggleStore) {
  }
}
