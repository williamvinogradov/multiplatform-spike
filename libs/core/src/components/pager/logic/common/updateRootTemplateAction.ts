import {IPagerState} from '../../state';
import {TUpdateStateActionFunc} from '../../../../common';

function updateRootTemplateAction(pagerTemplate: unknown): TUpdateStateActionFunc<IPagerState> {
  return (state) => [{
    ...state,
    pagerTemplate,
  }, {emitOutputs: false}];
}

export {updateRootTemplateAction};
