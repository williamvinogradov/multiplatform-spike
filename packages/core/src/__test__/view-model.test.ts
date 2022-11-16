import { createSelector, createViewModel } from '../view-model';
import { createMappedObservable, dispose, memoize } from '../utils';

jest.mock('../utils/observable');
jest.mock('../utils/disposable');
jest.mock('../utils/memoize');

describe('view-model', () => {
  it('builds mapped observalbes from entries', () => {
    const selector1 = jest.fn();
    const expectedObservable = { a: 1, b: 2, c: 3 };
    const state = {};
    const viewModelMap = {
      prop1: selector1,
    };
    const createMappedObservableMock = jest
      .mocked(createMappedObservable)
      .mockClear()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .mockReturnValue(expectedObservable as any);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const viewModel = createViewModel(state as any, viewModelMap);

    expect(createMappedObservableMock).toBeCalledTimes(1);
    expect(createMappedObservableMock).toBeCalledWith(state, selector1);

    expect(viewModel.prop1).toEqual(expectedObservable);
  });

  it('collects dispose functions', () => {
    const disposeFunctions: jest.Mock[] = [];
    // const disposables: Disposable<unknown>[] = [];
    const state = {};
    const viewModelMap = {
      prop1: jest.fn(),
      prop2: jest.fn(),
    };
    jest
      .mocked(createMappedObservable)
      .mockClear()
      .mockImplementation(() => {
        const disposeFunc = jest.fn();
        disposeFunctions.push(disposeFunc);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return { [dispose]: disposeFunc } as any;
      });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const viewModel = createViewModel(state as any, viewModelMap);

    disposeFunctions.forEach((disposeFunc) => {
      expect(disposeFunc).not.toBeCalled();
    });

    viewModel[dispose]();

    disposeFunctions.forEach((disposeFunc) => {
      expect(disposeFunc).toBeCalledTimes(1);
    });
  });
});

describe('selector', () => {
  it('passes arguments to memoize', () => {
    const func = jest.fn();
    const comparer = jest.fn();

    createSelector(func, jest.fn(), comparer);

    expect(memoize).toBeCalledTimes(1);
    expect(memoize).toBeCalledWith(func, comparer);
  });

  it('returns memoized', () => {
    const cachedValue = {};
    const cached = jest.fn().mockReturnValue(cachedValue);
    jest.mocked(memoize).mockReturnValue(cached);

    const selector = createSelector(jest.fn(), jest.fn(), jest.fn());

    expect(memoize).toBeCalledTimes(1);
    expect(selector()).toBe(cachedValue);
  });

  it('passes params to memoized', () => {
    const param = {};
    const getParams = jest.fn().mockReturnValue(param);
    const cached = jest.fn();
    jest.mocked(memoize).mockReturnValue(cached);

    const selector = createSelector(jest.fn(), getParams, jest.fn());
    selector();

    expect(cached).toBeCalledTimes(1);
    expect(cached).toBeCalledWith(param);
  });

  it('passes argument to params getter', () => {
    const paramsArgument = {};
    const getParams = jest.fn();
    const cached = jest.fn();
    jest.mocked(memoize).mockReturnValue(cached);

    const selector = createSelector(jest.fn(), getParams, jest.fn());
    selector(paramsArgument);

    expect(getParams).toBeCalledTimes(1);
    expect(getParams).toBeCalledWith(paramsArgument);
  });
});
