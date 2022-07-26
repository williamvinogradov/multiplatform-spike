import {ChangeDetectionStrategy, Component} from '@angular/core';
import {getSlideToggleTextVM, ISlideToggleTextVM, SlideToggleStore} from "dx-core";
import {Observable} from "rxjs";

@Component({
  selector: 'dx-slide-toggle-text-container',
  templateUrl: './dx-slide-toggle-text-container.component.html',
  styleUrls: ['./dx-slide-toggle-text-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxSlideToggleTextContainerComponent {

  viewModel$: Observable<ISlideToggleTextVM> = this.store.getViewModel(
    (state) => state.viewData.text,
    getSlideToggleTextVM,
  );

  constructor(private store: SlideToggleStore) {
  }
}
