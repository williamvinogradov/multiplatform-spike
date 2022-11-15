import { createViewModel } from '../view-model';
import { createMappedObservable, createDisposableCollector, Disposable } from '../utils';

jest.mock('../utils/observable');
jest.mock('../utils/disposable');

describe('view-model', () => {
  it('builds mapped observalbes from entries', () => {
    const selector1 = jest.fn();
    const expectedObservable = {};
    const state = {};
    const viewModelMap = {
      prop1: selector1,
    };
    const createMappedObservableMock = jest
      .mocked(createMappedObservable)
      .mockClear()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .mockReturnValue(expectedObservable as any);
    jest
      .mocked(createDisposableCollector)
      .mockClear()
      .mockReturnValue({
        peel(v: unknown) { return v; },
      } as any); // eslint-disable-line @typescript-eslint/no-explicit-any

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const viewModel = createViewModel(state as any, viewModelMap);

    expect(createMappedObservableMock).toBeCalledTimes(1);
    expect(createMappedObservableMock).toBeCalledWith(state, selector1);

    expect(viewModel.prop1).toBe(expectedObservable);
  });

  it('passes disposables to collector', () => {
    const disposables: Disposable<unknown>[] = [];
    const state = {};
    const viewModelMap = {
      prop1: jest.fn(),
      prop2: jest.fn(),
    };
    jest
      .mocked(createMappedObservable)
      .mockClear()
      .mockImplementation(() => {
        const disposable = {} as any; // eslint-disable-line @typescript-eslint/no-explicit-any
        disposables.push(disposable);
        return disposable;
      });
    const peel = jest.fn();
    jest
      .mocked(createDisposableCollector)
      .mockClear()
      .mockReturnValue({
        peel,
      } as any); // eslint-disable-line @typescript-eslint/no-explicit-any

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createViewModel(state as any, viewModelMap);

    disposables.forEach((disposable, i) => {
      expect(peel).toHaveBeenNthCalledWith(i + 1, disposable);
    });
  });
});
