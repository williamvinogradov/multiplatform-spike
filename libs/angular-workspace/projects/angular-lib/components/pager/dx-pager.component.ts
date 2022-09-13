import {ChangeDetectionStrategy, Component, OnChanges, OnInit} from '@angular/core';
import {combineLatest, map, Observable, Subject, takeUntil} from 'rxjs';
import {IAngularViewData} from '@dx/angular-common';
import {DxPagerCore} from '@dx/core/components/pager'
import {DxPagerContracts, IPagerPageNumberAngularVM, IPagerPageSizeAngularVM} from './types';
import {IDxPagerViewActions, IDxPagerViewModel} from './views';

@Component({
  selector: 'dx-pager',
  template: `
    <dx-dynamic-template *ngIf="templateViewModel$ | async as templateViewModel"
                         [template]="pagerTemplate"
                         [data]="templateViewModel">
    </dx-dynamic-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DxPagerCore]
})
export class DxPagerComponent extends DxPagerContracts
  implements OnInit, OnChanges {

  templateViewModel$ = this.getTemplateViewModel();

  private destroy$ = new Subject<void>();

  constructor(private component: DxPagerCore) {
    super();
  }

  ngOnInit(): void {
    this.component.selectedPageChangeOutput$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: number) => this.selectedPageChange.emit(value));

    this.component.selectedPageSizeChangeOutput$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: number) => this.selectedPageSizeChange.emit(value));
  }

  ngOnChanges(): void {
    this.updateStateFromInputs();
  }

  private getTemplateViewModel(): Observable<IAngularViewData<IDxPagerViewModel, IDxPagerViewActions>> {
    return combineLatest([
      this.component.pageSizeLogic.viewModel$ as Observable<IPagerPageSizeAngularVM>,
      this.component.pageNumberLogic.viewModel$ as Observable<IPagerPageNumberAngularVM>,
    ]).pipe(
      map(([pageSizeViewModel, pageNumberViewModel]) => ({
        viewModel: {
          pageSizeViewModel,
          pageNumberViewModel,
        },
        actions: {
          selectPage: (pageNumber: number) => this.component.pageNumberLogic.selectPageAction(pageNumber),
          selectPageSize: (pageSize: number) => this.component.pageSizeLogic.selectPageSize(pageSize),
        }
      }))
    );
  }

  private updateStateFromInputs(): void {
    this.component.updateRootTemplate(this.pagerTemplate);
    this.component.pageNumberLogic.updateFromProps({
      count: this.pageCount,
      templates: {
        general: this.pageNumberTemplate,
        item: this.pageNumberItemTemplate,
        fakeItem: this.pageNumberFakeItemTemplate,
      }
    });
    this.component.pageSizeLogic.updateFromProps({
      sizes: this.pageSizes,
      templates: {
        general: this.pageSizeTemplate,
        item: this.pageSizeItemTemplate,
      }
    })
  }
}
