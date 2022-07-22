import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'dx-slide-toggle-text',
  templateUrl: './slide-toggle-text.component.html',
  styleUrls: ['./slide-toggle-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideToggleTextComponent  {
  @Input() text = '';
}
