import {DxOutputs} from '../../common';
import {IPagerOutputs, IPagerState} from '../../types/pager';

class DxPagerOutputs extends DxOutputs<IPagerState, IPagerOutputs> {
  outputs$ = {
    selectedPageChange: this.getOutput$((state) => state.selectedPage),
    selectedPageSizeChange: this.getOutput$((state) => state.selectedPageSize),
  };
}

export {
  DxPagerOutputs,
}
