import {State} from '../../common';
import {IPagerState, PAGER_DEFAULT_STATE} from '../../types/pager';

class PagerState extends State<IPagerState> {
  constructor() {
    super(PAGER_DEFAULT_STATE);
  }
}

export {
  PagerState,
}
