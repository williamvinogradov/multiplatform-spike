import { createObservableEmitter } from '../../observable';

describe('Core: Utils: Observable.getValue', () => {
  it('stores initial value', () => {
    const initialValue = {};

    const observable = createObservableEmitter(initialValue);

    expect(observable.getValue()).toBe(initialValue);
  });

  it('stores emitted value', () => {
    const emittedValue = {};
    const observable = createObservableEmitter({});

    observable.emit(emittedValue);

    expect(observable.getValue()).toBe(emittedValue);
  });
});
