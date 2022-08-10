import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {
  ISlideToggleIndicatorVM
} from '@dx/core/components/slideToggle';

@Component({
  selector: 'dx-slide-toggle-indicator-view',
  templateUrl: './dx-slide-toggle-indicator-view.component.html',
  styleUrls: ['./dx-slide-toggle-indicator-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxSlideToggleIndicatorViewComponent {
  @Input() viewModel: ISlideToggleIndicatorVM = {
    value: false,
    textPosition: 'right',
  };
}
