import {ComponentContextContainer, ContextCallbacks, createInjectionToken} from '@dx/angular-common';
import {SlideToggleContractModels, SlideToggleStore} from '@dx/core/components/slideToggle';

type SlideToggleCallbacks = ContextCallbacks<SlideToggleContractModels>;
type SlideToggleContext = ComponentContextContainer<SlideToggleStore, SlideToggleContractModels>;

const slideToggleContextFactory = (): SlideToggleContext => ({ context: undefined });
const SLIDE_TOGGLE_CONTEXT_TOKEN = createInjectionToken('SLIDE_TOGGLE_TOKEN');


export type {SlideToggleContext, SlideToggleCallbacks};
export {
  slideToggleContextFactory,
  SLIDE_TOGGLE_CONTEXT_TOKEN,
}
