import {State} from '../../core';
import {IPagerState, PAGER_DEFAULT_STATE} from '../../types/pager';

class PagerState extends State<IPagerState> {
  constructor() {
    super(PAGER_DEFAULT_STATE);
  }
}

export {
  PagerState,
}
