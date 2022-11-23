import { DISPOSE } from '../../utils';
import { createViewModel } from '../../view-model';
import { createViewModelManager } from '../viewModelManager';

jest.mock('../../view-model');

const createViewModelMock = jest.mocked(createViewModel);
const viewModelMock = {
  subscribe: jest.fn(),
  getValue: jest.fn(),
  [DISPOSE]: jest.fn(),
};

describe('Core: Component: ViewManager', () => {
  afterAll(() => jest.resetAllMocks());

  it('adds new view model', () => {
    const expectedViewModel = {
      ...viewModelMock,
    };
    const viewModelKey = 'viewModelA';
    createViewModelMock.mockReturnValue(expectedViewModel);

    const manager = createViewModelManager();
    manager.add({}, jest.fn(), {
      [viewModelKey]: jest.fn(),
    });
    const viewModels = manager.get();

    expect(viewModels[viewModelKey]).toBe(expectedViewModel);
  });

  it('uses the createViewModel func for adding new view models', () => {
    const stateValue = {};
    const stateSubscribe = jest.fn();

    const manager = createViewModelManager();
    manager.add(stateValue, stateSubscribe, {
      A: jest.fn(),
      B: jest.fn(),
    });

    expect(createViewModelMock).toHaveBeenCalledTimes(2);
    expect(createViewModelMock)
      .toHaveBeenNthCalledWith(1, stateValue, stateSubscribe, expect.anything());
    expect(createViewModelMock)
      .toHaveBeenNthCalledWith(2, stateValue, stateSubscribe, expect.anything());
  });

  it('skips undefined selectors on the adding new view models', () => {
    const stateValue = {};
    const stateSubscribe = jest.fn();
    const expectedViewModelKeys = ['B'];

    const manager = createViewModelManager();
    manager.add(stateValue, stateSubscribe, {
      A: undefined,
      B: jest.fn(),
    });
    const viewModels = manager.get();

    expect(createViewModelMock).toHaveBeenCalledTimes(1);
    expect(Object.keys(viewModels)).toEqual(expectedViewModelKeys);
  });

  it('throws error if adds view model with same key twice', () => {
    createViewModelMock.mockReturnValue(viewModelMock);

    const manager = createViewModelManager();
    const addViewModel = () => {
      manager.add({}, jest.fn(), {
        A: jest.fn(),
      });
    };

    addViewModel();

    expect(addViewModel).toThrow();
  });

  it('deletes view models', () => {
    const manager = createViewModelManager();
    manager.add({}, jest.fn(), {
      A: jest.fn(),
      B: jest.fn(),
      C: jest.fn(),
      D: jest.fn(),
    });
    manager.remove('A', 'C');
    const viewModels = manager.get();

    expect(Object.keys(viewModels)).toEqual(['B', 'D']);
  });

  it('calls view model\'s dispose when deleting it', () => {
    const disposeA = jest.fn();
    const selectorA = jest.fn();
    const disposeC = jest.fn();
    const selectorC = jest.fn();

    createViewModelMock.mockImplementation((_, __, selector) => {
      switch (true) {
        case selector === selectorA:
          return { ...viewModelMock, [DISPOSE]: disposeA };
        case selector === selectorC:
          return { ...viewModelMock, [DISPOSE]: disposeC };
        default:
          return { ...viewModelMock };
      }
    });

    const manager = createViewModelManager();
    manager.add({}, jest.fn(), {
      A: selectorA,
      B: jest.fn(),
      C: selectorC,
      D: jest.fn(),
    });
    manager.remove('A', 'C');

    expect(disposeA).toHaveBeenCalledTimes(1);
    expect(disposeC).toHaveBeenCalledTimes(1);
  });

  it('does nothing on delete if view model with passed key doesn\'t exist', () => {
    const manager = createViewModelManager();
    manager.add({}, jest.fn(), {
      A: jest.fn(),
      B: jest.fn(),
    });
    manager.remove('C');
    const viewModels = manager.get();

    expect(Object.keys(viewModels)).toEqual(['A', 'B']);
  });

  it('calls each view model\'s dispose on dispose', () => {
    const disposeA = jest.fn();
    const selectorA = jest.fn();
    const disposeB = jest.fn();
    const selectorB = jest.fn();

    createViewModelMock.mockImplementation((_, __, selector) => {
      switch (true) {
        case selector === selectorA:
          return { ...viewModelMock, [DISPOSE]: disposeA };
        case selector === selectorB:
          return { ...viewModelMock, [DISPOSE]: disposeB };
        default:
          return { ...viewModelMock };
      }
    });

    const manager = createViewModelManager();
    manager.add({}, jest.fn(), {
      A: selectorA,
      B: selectorB,
    });
    manager[DISPOSE]();

    expect(disposeA).toHaveBeenCalledTimes(1);
    expect(disposeB).toHaveBeenCalledTimes(1);
  });
});
