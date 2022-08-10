import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {
  ISlideToggleTextVM
} from "@dx/core/components/slideToggle";

@Component({
  selector: 'dx-slide-toggle-text-view',
  templateUrl: './dx-slide-toggle-text-view.component.html',
  styleUrls: ['./dx-slide-toggle-text-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxSlideToggleTextViewComponent {
  @Input() viewModel: ISlideToggleTextVM = {
    text: '',
  };
}
