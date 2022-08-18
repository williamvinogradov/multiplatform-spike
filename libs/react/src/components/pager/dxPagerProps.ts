import {IPagerState, IPagerOutputs} from '@dx/core/types/pager';
import {TReactInputs, TReactOutputs} from '../../common/types';

interface IDxPagerProps extends TReactInputs<IPagerState>, TReactOutputs<IPagerOutputs> {
}

export type {
  IDxPagerProps
}
