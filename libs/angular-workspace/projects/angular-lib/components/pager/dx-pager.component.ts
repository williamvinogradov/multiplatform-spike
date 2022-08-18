import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnChanges, OnInit} from '@angular/core';
import {DxPagerLogic, DxPagerOutputs, PagerState} from '@dx/core/components/pager';
import {IPagerState} from '@dx/core/types/pager';
import {map, Subject, takeUntil} from 'rxjs';
import {DxPagerContracts} from '@dx/angular-common';

@Component({
  selector: 'dx-pager',
  templateUrl: './dx-pager.component.html',
  styleUrls: ['./dx-pager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: DxPagerContracts, useExisting: forwardRef(() => DxPagerComponent)},
    {provide: PagerState, useClass: PagerState},
    {
      provide: DxPagerLogic,
      useFactory: (state: PagerState) => new DxPagerLogic(state),
      deps: [PagerState],
    },
    {
      provide: DxPagerOutputs,
      useFactory: (state: PagerState) => new DxPagerOutputs(state),
      deps: [PagerState],
    },
  ]
})
export class DxPagerComponent extends DxPagerContracts implements
    OnInit,
    OnChanges {

  pageSizeVM$ = this.logic.pageSizeVM$.pipe(map(({items}) => items));
  pageNumberVM$ = this.logic.pageNumberVM$.pipe(map(({items}) => items));

  private destroy$ = new Subject<void>();

  constructor(private logic: DxPagerLogic,
              private outputs: DxPagerOutputs,
              private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.outputs.outputs$.selectedPageChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: number) => this.selectedPageChange.emit(value));

    this.outputs.outputs$.selectedPageSizeChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: number) => this.selectedPageSizeChange.emit(value));
  }

  ngOnChanges(): void {
    this.logic.updateStateFromPropsAction(this);
  }

  selectPage(selectedPage: number): void {
    this.logic.selectPageAction(selectedPage);
  }

  selectPageSize(selectedPageSize: number): void {
    this.logic.selectPageSizeAction(selectedPageSize);
  }

  override updateInputs(props: Partial<IPagerState>): void {
    this.logic.updateStateFromPropsAction({
      selectedPage: props.selectedPage,
      selectedPageSize: props.selectedPageSize,
      pageCount: props.pageCount,
      pageSizes: props.pageSizes,
    });
  }

  trackByRecordId({recordId}: {recordId: string}): string {
    return recordId;
  }
}
