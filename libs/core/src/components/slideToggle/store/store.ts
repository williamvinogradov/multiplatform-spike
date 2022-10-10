import {DeepPartial} from 'ts-essentials';
import {createStore, Store} from '../../../internal';
import {SlideToggleContracts} from '../types';
import {SLIDE_TOGGLE_ACTIONS, SlideToggleActions} from './actions/slideToggleActions';
import {getStateFromContracts} from './common/getStateFromContracts';
import {SLIDE_TOGGLE_DEFAULT_STATE, SlideToggleState} from './state';

interface SlideToggleStore extends Store<SlideToggleActions, SlideToggleState> {
}

function createSlideToggleStore(
  contracts: DeepPartial<SlideToggleContracts>,
) {
  const initialState = getStateFromContracts(SLIDE_TOGGLE_DEFAULT_STATE, contracts);
  return createStore<SlideToggleActions, SlideToggleState>(initialState, SLIDE_TOGGLE_ACTIONS);
}

export type {SlideToggleStore};
export {createSlideToggleStore};
