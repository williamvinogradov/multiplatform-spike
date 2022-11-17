import { DISPOSE } from '../../disposable';
import { createMappedObservable } from '../../observable';

describe('mapped observable', () => {
  it('forwards source value to map func on creation', () => {
    const initialValue = {};
    const mapFunc = jest.fn();

    createMappedObservable(initialValue, jest.fn(), mapFunc);

    expect(mapFunc).toBeCalledTimes(1);
    expect(mapFunc).toBeCalledWith(initialValue);
  });

  it('forwards updated source value to map function', () => {
    const mapFunc = jest.fn();
    const subscribe = jest.fn();
    const value = {};

    createMappedObservable({}, subscribe, mapFunc);
    mapFunc.mockClear();
    const listener = subscribe.mock.lastCall[0];
    listener(value);

    expect(mapFunc).toBeCalledTimes(1);
    expect(mapFunc).toBeCalledWith(value);
  });

  it('uses map function to store inital value', () => {
    const mappedValue = {};
    const mapFunc = jest.fn().mockReturnValue(mappedValue);

    const observable = createMappedObservable({}, jest.fn(), mapFunc);

    expect(observable.getValue()).toBe(mappedValue);
  });

  it('uses map function if no inital value provided', () => {
    const mappedValue = {};
    const mapFunc = jest.fn().mockReturnValue(mappedValue);

    const observable = createMappedObservable({}, jest.fn(), mapFunc);

    expect(observable.getValue()).toBe(mappedValue);
  });

  it('uses map function to update value', () => {
    const mappedValue = {};
    const mapFunc = jest.fn();
    const subscribe = jest.fn();

    const observable = createMappedObservable({}, subscribe, mapFunc);
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

    const mappedObservable = createMappedObservable({}, subscribe, jest.fn());
    expect(unsubscribe).not.toBeCalled();
    mappedObservable[DISPOSE]();

    expect(unsubscribe).toBeCalledTimes(1);
  });
});
