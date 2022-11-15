import { createObservableEmitter } from '../../observable';
import fn = jest.fn;

describe('Core: Utils: observable', () => {
  interface Observed {
    value: number
  }

  it('Emits same value to all subscribers', () => {
    const testValue: Observed = { value: 2 };
    const observable = createObservableEmitter<Observed>();

    let firstResult;
    let secondResult;
    observable.subscribe((value) => { firstResult = value; });
    observable.subscribe((value) => { secondResult = value; });
    observable.emit(testValue);

    expect(firstResult === secondResult).toBeTruthy();
  });

  it('Calls all subscribers on each emit', () => {
    const testValue: Observed = { value: 2 };
    const observable = createObservableEmitter<Observed>();
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

  it('Shouldn\'t call subscribers after unsubscribe', () => {
    const testValue: Observed = { value: 2 };
    const observable = createObservableEmitter<Observed>();
    const spySubscriber = fn();

    const unsubscribe = observable.subscribe(spySubscriber);
    observable.emit(testValue);
    unsubscribe();
    observable.emit(testValue);

    expect(spySubscriber).toHaveBeenCalledTimes(1);
  });

  it('Emits new values for not unsubscribed subscribers', () => {
    const testValue: Observed = { value: 2 };
    const observable = createObservableEmitter<Observed>();
    const spySubscriberFirst = fn();
    const spySubscriberSecond = fn();

    const unsubscribe = observable.subscribe(spySubscriberFirst);
    observable.subscribe(spySubscriberSecond);
    unsubscribe();
    observable.emit(testValue);
    observable.emit(testValue);

    expect(spySubscriberSecond).toHaveBeenCalledTimes(2);
  });

  it('Handles the same function passed to subscribe multiple times', () => {
    const testValue: Observed = { value: 2 };
    const observable = createObservableEmitter<Observed>();
    const spySubscriber = fn();

    observable.subscribe(spySubscriber);
    observable.subscribe(spySubscriber);
    observable.subscribe(spySubscriber);
    observable.emit(testValue);

    expect(spySubscriber).toHaveBeenCalledTimes(1);
  });

  it('Should correctly unsubscribe the same function passed to subscribe multiple times', () => {
    const testValue: Observed = { value: 2 };
    const observable = createObservableEmitter<Observed>();
    const spySubscriber = fn();

    const unsubscribe = observable.subscribe(spySubscriber);
    observable.subscribe(spySubscriber);
    observable.subscribe(spySubscriber);
    unsubscribe();
    observable.emit(testValue);

    expect(spySubscriber).not.toHaveBeenCalled();
  });

  it('Emits new values to resubscribed function', () => {
    const testValue: Observed = { value: 2 };
    const observable = createObservableEmitter<Observed>();
    const spySubscriber = fn();

    const unsubscribe = observable.subscribe(spySubscriber);
    observable.subscribe(spySubscriber);
    observable.emit(testValue);
    unsubscribe();
    observable.subscribe(spySubscriber);
    observable.emit(testValue);

    expect(spySubscriber).toHaveBeenCalledTimes(2);
  });
});