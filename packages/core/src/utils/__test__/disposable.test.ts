import { createDisposableCollector, dispose } from '../disposable';

describe('disposableCollector', () => {
  it('removes dispose function', () => {
    const collector = createDisposableCollector();

    const peeled = collector.peel({ [dispose]: jest.fn() });

    expect(peeled).not.toHaveProperty([dispose]);
  });

  it('copies other properties', () => {
    const disposable = {
      [dispose]: jest.fn(),
      anotherProp: {},
    };
    const collector = createDisposableCollector();

    const peeled = collector.peel(disposable);

    expect(peeled).toHaveProperty('anotherProp');
    expect(peeled.anotherProp).toBe(disposable.anotherProp);
  });

  it('does not modify argument', () => {
    const disposeFunc = jest.fn();
    const disposable = { [dispose]: disposeFunc };
    const collector = createDisposableCollector();

    collector.peel(disposable);

    expect(disposable).toHaveProperty([dispose]);
    expect(disposable[dispose]).toBe(disposeFunc);
  });

  it('calls collected dispose functions', () => {
    const disposeFunctions = [jest.fn(), jest.fn(), jest.fn()];
    const collector = createDisposableCollector();

    disposeFunctions.forEach((f) => collector.peel({ [dispose]: f }));
    disposeFunctions.forEach((f) => expect(f).not.toBeCalled());

    collector[dispose]();
    disposeFunctions.forEach((f) => expect(f).toBeCalledTimes(1));
  });
});
