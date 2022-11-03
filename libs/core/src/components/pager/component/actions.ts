import {Action, ActionHandler, ActionMap} from '../../../internal';
import {PagerDictionary, PagerModel} from './state';


enum PagerActions {
  selectPage = 'PAGER_SELECT_PAGE',
  selectPageSize = 'PAGER_SELECT_PAGE_SIZE',
}

class SelectPageAction extends Action<PagerActions> {
  readonly type = PagerActions.selectPage;

  constructor(public selectedPage: number) {
    super();
  }
}

const selectPageHandler: ActionHandler<PagerActions, PagerModel, PagerDictionary> = (
  _, action: Action<PagerActions>
): Partial<PagerModel> => {
  const {selectedPage} = action as SelectPageAction;
  return { selectedPage };
}

class SelectPageSizeAction extends Action<PagerActions> {
  readonly type = PagerActions.selectPageSize;

  constructor(public selectedPageSize: number) {
    super();
  }
}

const selectPageSizeHandler: ActionHandler<PagerActions, PagerModel, PagerDictionary> = (
  _, action: Action<PagerActions>
): Partial<PagerModel> => {
  const {selectedPageSize} = action as SelectPageSizeAction;
  return { selectedPageSize };
}

const PAGER_ACTIONS: ActionMap<PagerActions, PagerModel, PagerDictionary> = {
  [PagerActions.selectPage]: selectPageHandler,
  [PagerActions.selectPageSize]: selectPageSizeHandler,
};

export {
  PagerActions,
  PAGER_ACTIONS,
  SelectPageAction,
  SelectPageSizeAction,
};

