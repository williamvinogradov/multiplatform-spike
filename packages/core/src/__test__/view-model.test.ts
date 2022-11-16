import { createViewModel } from '../view-model';
import { createMappedObservable, dispose } from '../utils';

jest.mock('../utils/observable');
jest.mock('../utils/disposable');

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
