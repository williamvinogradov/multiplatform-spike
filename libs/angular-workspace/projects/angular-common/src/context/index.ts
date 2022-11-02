import {InjectionToken} from '@angular/core';

type ComponentContextContainer<TContext> = {
  context?: TContext;
}

const createInjectionToken = (token: string) => new InjectionToken(token);

export type {
  ComponentContextContainer,
};

export {createInjectionToken};
