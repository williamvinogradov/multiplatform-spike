import { createObservable } from '../observable';
import fn = jest.fn;

describe('Core: Utils: observable', () => {
  interface Observed {
    value: number
  }

  test('It should emit same value to all subscribers', () => {
    const testValue: Observed = { value: 2 };
    const observable = createObservable<Observed>();

    let firstResult;
    let secondResult;
    observable.subscribe((value) => { firstResult = value; });
    observable.subscribe((value) => { secondResult = value; });
    observable.emit(testValue);

    expect(firstResult === secondResult).toBeTruthy();
  });

  test('It should call all subscribers on each emit', () => {
    const testValue: Observed = { value: 2 };
    const observable = createObservable<Observed>();
    const spySubscribers = [fn(), fn(), fn(), fn()];

    observable.subscribe(spySubscribers[0]);
    observable.subscribe(spySubscribers[1]);
    observable.subscribe(spySubscribers[2]);
    observable.subscribe(spySubscribers[3]);
    observable.emit(testValue);
    observable.emit(testValue);

    spySubscribers.forEach((spy) => {
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  test('It shouldn\'t call subscribers after unsubscribe', () => {
    const testValue: Observed = { value: 2 };
    const observable = createObservable<Observed>();
    const spySubscriber = fn();

    const unsubscribe = observable.subscribe(spySubscriber);
    observable.emit(testValue);
    unsubscribe();
    observable.emit(testValue);

    expect(spySubscriber).toHaveBeenCalledTimes(1);
  });
});
