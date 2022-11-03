import {ChangeDetectionStrategy, Component, Inject, OnChanges, OnInit} from '@angular/core';
import {
  createPagerCore,
  RootPagerCore,
} from '@dx/core/components/pager'
import {PAGER_CONTEXT_TOKEN, PagerContext, pagerContextFactory} from './context';
import {inputsToDictionary, inputsToModel} from './mappers';
import {DxPagerInputs} from './types';


@Component({
  selector: 'dx-pager',
  template: '<dx-pager-container></dx-pager-container>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: PAGER_CONTEXT_TOKEN,
    useFactory: pagerContextFactory,
  }]
})
export class DxPagerComponent extends DxPagerInputs
  implements OnInit, OnChanges {

  private rootCore?: RootPagerCore;

  constructor(@Inject(PAGER_CONTEXT_TOKEN) private contextContainer: PagerContext) {
    super();
  }

  ngOnInit(): void {
    const [rootCore, containerCore] = createPagerCore(
      {
        model: inputsToModel(this),
        dictionary: inputsToDictionary(this),
      },
      {
        selectedPage: {
          isControlled: false,
          publicCallback: (value: number) => this.selectedPageChange.emit(value),
        },
        selectedPageSize: {
          isControlled: false,
          publicCallback: (value: number) => this.selectedPageSizeChange.emit(value),
        }
      }
    );

    this.rootCore = rootCore;
    this.contextContainer.context = containerCore;
  }

  ngOnChanges(): void {
    this.rootCore?.updateState({
      model: inputsToModel(this),
      dictionary: inputsToDictionary(this),
    });
    this.rootCore?.completeUpdate();
  }
}
