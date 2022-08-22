import {Directive, OnDestroy} from '@angular/core';
import {DxPagerContracts} from '@dx/angular-common';
import {DxSimpleGridLogic} from '@dx/core/components/simpleGrid';
import {asyncScheduler, scheduled, Subject, takeUntil} from 'rxjs';

@Directive({
  selector: '[dxSimpleGridPager]',
})
export class DxSimpleGridPagerAdapterDirective<TData>
  implements OnDestroy {
  viewModel$ = this.logic.pagingVM$;

  private destroy$ = new Subject<void>();

  constructor(private hostComponent: DxPagerContracts,
              private logic: DxSimpleGridLogic<TData>) {
  }

  ngOnInit(): void {
    this.logic.updateStateFromPagingPropsAction({
      selectedPage: this.hostComponent.selectedPage,
      selectedPageSize: this.hostComponent.selectedPageSize,
      pageSizes: this.hostComponent.pageSizes,
    });

    this.viewModel$.pipe(takeUntil(this.destroy$))
      .subscribe((viewModel) => {
        this.hostComponent.updateInputs(viewModel);
      });

    scheduled<number>(this.hostComponent.selectedPageChange, asyncScheduler)
      .pipe(takeUntil(this.destroy$))
      .subscribe((selectedPage) => {
        this.logic.updatePaging({selectedPage});
      });

    scheduled<number>(this.hostComponent.selectedPageSizeChange, asyncScheduler)
      .pipe(takeUntil(this.destroy$))
      .subscribe((selectedPageSize) => {
        this.logic.updatePaging({selectedPageSize});
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
