import {DxComponent, watch, watchOutput} from '../../common';
import {updateRootTemplateAction} from './logic/common/updateRootTemplateAction';
import {PageNumberLogic} from './logic/pageNumber';
import {PageSizeLogic} from './logic/pageSize';
import {IPagerState, PAGER_DEFAULT_STATE} from './state';

class DxPagerCore extends DxComponent<IPagerState> {
  readonly pageNumberLogic = new PageNumberLogic(this.state);
  readonly pageSizeLogic = new PageSizeLogic(this.state);

  template$ = this.state$.pipe(watch((state) => ({template: state.pagerTemplate})));

  selectedPageChangeOutput$ = this.state$.pipe(watchOutput((state) => state.pageNumber.selected));
  selectedPageSizeChangeOutput$ = this.state$.pipe(watchOutput((state) => state.pageSize.selected));

  constructor() {
    super(PAGER_DEFAULT_STATE);
  }

  updateRootTemplate(rootTemplate: unknown): void {
    this.state.updateState(updateRootTemplateAction(rootTemplate));
  }
}

export {DxPagerCore};
