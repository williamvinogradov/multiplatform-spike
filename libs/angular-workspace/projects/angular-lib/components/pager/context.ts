import {ContainerPagerCore} from '@dx/core/components/pager';
import {ComponentContextContainer, createInjectionToken} from '@dx/angular-common';

type PagerContext = ComponentContextContainer<ContainerPagerCore>;

const pagerContextFactory = (): PagerContext => ({ context: undefined });
const PAGER_CONTEXT_TOKEN = createInjectionToken('PAGER_TOKEN');


export type {PagerContext};
export {pagerContextFactory, PAGER_CONTEXT_TOKEN}
