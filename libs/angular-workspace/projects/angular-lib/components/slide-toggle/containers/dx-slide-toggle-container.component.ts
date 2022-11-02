import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {ContainerSlideToggleCore, SlideToggleVM, UpdateValueAction} from '@dx/core/components/slideToggle';
import {useViewModel} from '@dx/angular-common';
import {Observable} from 'rxjs';
import {SLIDE_TOGGLE_CONTEXT_TOKEN, SlideToggleContext} from '../context';


@Component({
  selector: 'dx-slide-toggle-container',
  template: `
    <div *ngIf="viewModel$ | async as viewModel"
         class="dx-slide-toggle"
         [class.-left]="viewModel.dictionary.textPosition === 'left'"
         [class.-right]="viewModel.dictionary.textPosition === 'right'"
         (click)="updateValue()">
      <dx-dynamic-template [template]="viewModel.dictionary.indicatorView"
                           [data]="{viewModel}">
      </dx-dynamic-template>
      <dx-dynamic-template [template]="viewModel.dictionary.textView"
                           [data]="{viewModel}">
      </dx-dynamic-template>
    </div>
  `,
  styleUrls: ['./dx-slide-toggle-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxSlideToggleContainerComponent implements OnInit {
  viewModel$?: Observable<SlideToggleVM>;

  private core?: ContainerSlideToggleCore;

  constructor(@Inject(SLIDE_TOGGLE_CONTEXT_TOKEN) private contextContainer: SlideToggleContext) {
  }

  ngOnInit(): void {
    this.core = this.contextContainer.context!;
    this.viewModel$ = useViewModel(this.core!.viewModels.general);
  }

  updateValue(): void {
    this.core?.dispatch(new UpdateValueAction());
  }
}
