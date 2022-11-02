import {ComponentContextContainer, createInjectionToken} from '@dx/angular-common';
import {ContainerSlideToggleCore} from '@dx/core/components/slideToggle';


type SlideToggleContext = ComponentContextContainer<ContainerSlideToggleCore>;

const slideToggleContextFactory = (): SlideToggleContext => ({ context: undefined });
const SLIDE_TOGGLE_CONTEXT_TOKEN = createInjectionToken('SLIDE_TOGGLE_TOKEN');


export type {SlideToggleContext};
export {slideToggleContextFactory, SLIDE_TOGGLE_CONTEXT_TOKEN}
