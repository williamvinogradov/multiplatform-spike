import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ISlideToggleState, SLIDE_TOGGLE_DEFAULT_STATE} from '@dx/core/components/slideToggle';

@Component({
  selector: 'dx-slide-toggle-template',
  template: `
    <div class="dx-slide-toggle"
         [class.-left]="viewModel.config.textPosition === 'left'"
         [class.-right]="viewModel.config.textPosition === 'right'"
         (click)="updateValue.emit(!viewModel.value)">
      <dx-dynamic-template [template]="viewModel.templates.indicatorView"
                           [data]="{viewModel}">
      </dx-dynamic-template>
      <dx-dynamic-template [template]="viewModel.templates.textView"
                           [data]="{viewModel}">
      </dx-dynamic-template>
    </div>
  `,
  styleUrls: ['./dx-slide-toggle-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxSlideToggleTemplateComponent {
  @Input() viewModel: ISlideToggleState = SLIDE_TOGGLE_DEFAULT_STATE;

  @Output() updateValue = new EventEmitter<boolean>;
}
