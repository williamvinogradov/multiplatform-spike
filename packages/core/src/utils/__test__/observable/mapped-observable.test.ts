import { dispose } from '../../disposable';
import { createMappedObservable } from '../../observable';

describe('mapped observable', () => {
  it('forwards source value to map func on creation', () => {
    const value = {};
    const mapFunc = jest.fn();
    const getValue = jest.fn().mockReturnValue(value);
    const source = {
      getValue,
      subscribe: jest.fn(),
    };

    createMappedObservable(source, mapFunc);

    expect(mapFunc).toBeCalledTimes(1);
    expect(mapFunc).toBeCalledWith(value);
  });

  it('forwards updated source value to map function', () => {
    const mapFunc = jest.fn();
    const subscribe = jest.fn();
    const value = {};
    const source = {
      subscribe,
    };

    createMappedObservable(source, mapFunc);
    mapFunc.mockClear();
    const listener = subscribe.mock.lastCall[0];
    listener(value);

    expect(mapFunc).toBeCalledTimes(1);
    expect(mapFunc).toBeCalledWith(value);
  });

  it('uses map function to store inital value', () => {
    const mappedValue = {};
    const mapFunc = jest.fn().mockReturnValue(mappedValue);
    const source = {
      subscribe: jest.fn(),
      getValue: jest.fn(),
    };

    const observable = createMappedObservable(source, mapFunc);

    expect(observable.getValue()).toBe(mappedValue);
  });

  it('uses map function if no inital value provided', () => {
    const mappedValue = {};
    const mapFunc = jest.fn().mockReturnValue(mappedValue);
    const source = {
      subscribe: jest.fn(),
    };

    const observable = createMappedObservable(source, mapFunc);

    expect(observable.getValue()).toBe(mappedValue);
  });

  it('uses map function to update value', () => {
    const mappedValue = {};
    const mapFunc = jest.fn();
    const subscribe = jest.fn();
    const source = {
      subscribe,
    };

    const observable = createMappedObservable(source, mapFunc);
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
    const source = {
      subscribe,
    };

    const mappedObservable = createMappedObservable(source, jest.fn());
    expect(unsubscribe).not.toBeCalled();
    mappedObservable[dispose]();

    expect(unsubscribe).toBeCalledTimes(1);
  });
});
