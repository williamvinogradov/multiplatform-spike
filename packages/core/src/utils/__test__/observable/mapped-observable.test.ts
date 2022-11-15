import { dispose } from '../../disposable';
import { createMappedObservable } from '../../observable';

describe('mapped observable', () => {
  it('forwards state to map func on creation', () => {
    const value = {};
    const mapFunc = jest.fn();
    const getValue = jest.fn().mockReturnValue(value);
    const state = {
      getValue,
      subscribe: jest.fn(),
    };

    createMappedObservable(state, mapFunc);

    expect(mapFunc).toBeCalledTimes(1);
    expect(mapFunc).toBeCalledWith(value);
  });

  it('forwards updated state to map function', () => {
    const mapFunc = jest.fn();
    const subscribe = jest.fn();
    const value = {};
    const state = {
      subscribe,
    };

    createMappedObservable(state, mapFunc);
    mapFunc.mockClear();
    const listener = subscribe.mock.lastCall[0];
    listener(value);

    expect(mapFunc).toBeCalledTimes(1);
    expect(mapFunc).toBeCalledWith(value);
  });

  it('uses map function to store inital value', () => {
    const mappedValue = {};
    const mapFunc = jest.fn().mockReturnValue(mappedValue);
    const state = {
      subscribe: jest.fn(),
      getValue: jest.fn(),
    };

    const observable = createMappedObservable(state, mapFunc);

    expect(observable.getValue()).toBe(mappedValue);
  });

  it('uses map function if no inital value provided', () => {
    const mappedValue = {};
    const mapFunc = jest.fn().mockReturnValue(mappedValue);
    const state = {
      subscribe: jest.fn(),
    };

    const observable = createMappedObservable(state, mapFunc);

    expect(observable.getValue()).toBe(mappedValue);
  });

  it('uses map function to update value', () => {
    const mappedValue = {};
    const mapFunc = jest.fn();
    const subscribe = jest.fn();
    const state = {
      subscribe,
    };

    const observable = createMappedObservable(state, mapFunc);
    mapFunc.mockReturnValue(mappedValue);
    let actual;
    observable.subscribe((v) => { actual = v; });

    const listener = subscribe.mock.lastCall[0];
    listener(undefined);

    expect(actual).toBe(mappedValue);
    expect(observable.getValue()).toBe(mappedValue);
  });

  it('unsubscribes on dispose', () => {
    const unsubscribe = jest.fn();
    const subscribe = jest.fn().mockReturnValue(unsubscribe);
    const state = {
      subscribe,
    };

    const mappedObservable = createMappedObservable(state, jest.fn());
    expect(unsubscribe).not.toBeCalled();
    mappedObservable[dispose]();

    expect(unsubscribe).toBeCalledTimes(1);
  });
});
