import {PagerModel} from '@dx/core/components/pager';
import {DxPagerInputs} from '../types';


const inputsToModel = (inputs: DxPagerInputs): Partial<PagerModel> => {
  const result: Partial<PagerModel> = {};

  inputs.selectedPage !== undefined && (result.selectedPage = inputs.selectedPage);
  inputs.selectedPageSize !== undefined && (result.selectedPageSize = inputs.selectedPageSize);

  return result;
}

export {inputsToModel};
