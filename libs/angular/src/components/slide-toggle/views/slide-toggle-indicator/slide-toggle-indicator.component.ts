import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'dx-slide-toggle-indicator',
  templateUrl: './slide-toggle-indicator.component.html',
  styleUrls: ['./slide-toggle-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideToggleIndicatorComponent {
  @Input() value = false;
}
