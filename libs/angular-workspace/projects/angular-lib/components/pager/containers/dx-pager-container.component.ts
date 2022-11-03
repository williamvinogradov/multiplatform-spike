import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {useViewModel} from '@dx/angular-common';
import {
  ContainerPagerCore, PageNumberVM, PageSizeVM, RootTemplateVM, SelectPageAction, SelectPageSizeAction,
} from '@dx/core/components/pager';
import {combineLatest, map, Observable} from 'rxjs';
import {PAGER_CONTEXT_TOKEN, PagerContext} from '../context';
import {PageNumberAngularVM, PageSizeAngularVM, RootTemplateAngularVM} from '../types';
import {DxPagerViewBase, DxPagerViewData,} from '../views';


@Component({
  selector: 'dx-pager-container',
  template: `
    <dx-dynamic-template *ngIf="template$ && viewModel$"
                         [template]="template$ | async"
                         [data]="viewModel$ | async">
    </dx-dynamic-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxPagerContainerComponent implements OnInit {
  viewModel$?: Observable<DxPagerViewData>;
  template$?: Observable<DxPagerViewBase>;

  private core?: ContainerPagerCore;

  constructor(@Inject(PAGER_CONTEXT_TOKEN) private contextContainer: PagerContext) {
  }

  ngOnInit(): void {
    this.core = this.contextContainer.context!;

    this.template$ = useViewModel<RootTemplateVM, RootTemplateAngularVM>(this.core.viewModels.rootTemplate)
      .pipe(map(({template}) => template));

    this.viewModel$ = combineLatest([
      useViewModel<PageNumberVM, PageNumberAngularVM>(this.core.viewModels.pageNumber),
      useViewModel<PageSizeVM, PageSizeAngularVM>(this.core.viewModels.pageSize),
    ]).pipe(
      map(([pageNumberVM, pageSizeVM]) => ({
        viewModel: {
          pageNumberViewModel: pageNumberVM,
          pageSizeViewModel: pageSizeVM,
        },
        actions: {
          selectPage: (value: number) => this.core?.dispatch(new SelectPageAction(value)),
          selectPageSize: (value: number) => this.core?.dispatch(new SelectPageSizeAction(value))
        }
      }))
    );
  }
}
