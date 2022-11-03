import {SlideToggleModel} from '@dx/core/components/slideToggle';
import {DxSlideToggleInputs} from '../types';


const inputsToModel = (inputs: DxSlideToggleInputs): Partial<SlideToggleModel> => {
  const result: Partial<SlideToggleModel> = {};

  inputs.value !== undefined && (result.value = inputs.value);

  return result;
}

export {inputsToModel};
