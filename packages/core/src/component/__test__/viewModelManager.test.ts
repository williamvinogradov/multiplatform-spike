import { DISPOSE } from '../../utils';
import { createViewModel } from '../../viewModel';
import { createViewModelManager } from '../viewModelManager';

jest.mock('../../viewModel');

const createViewModelMock = jest.mocked(createViewModel);
const viewModelMock = {
  subscribe: jest.fn(),
  getValue: jest.fn(),
  [DISPOSE]: jest.fn(),
};

describe('Core: Component: ViewManager', () => {
  afterAll(() => jest.resetAllMocks());

  it('add new view model', () => {
    const expectedViewModel = {
      ...viewModelMock,
    };
    const selector = jest.fn();
    const viewModelKey = 'viewModelA';
    createViewModelMock.mockReturnValue(expectedViewModel);

    const manager = createViewModelManager();
    manager.addViewModels({}, jest.fn(), {
      [viewModelKey]: selector,
    });
    const viewModels = manager.getViewModels();

    expect(viewModels[viewModelKey]).toBe(expectedViewModel);
  });

  it('use the createViewModel func for adding new view models', () => {
    const stateValue = {};
    const stateSubscribe = jest.fn();

    const manager = createViewModelManager();
    manager.addViewModels(stateValue, stateSubscribe, {
      A: jest.fn(),
      B: jest.fn(),
    });

    expect(createViewModelMock).toHaveBeenCalledTimes(2);
    const [[stateArg1, subscribeArg1], [stateArg2, subscribeArg2]] = createViewModelMock.mock.calls;
    expect(stateArg1).toBe(stateValue);
    expect(stateArg2).toBe(stateValue);
    expect(subscribeArg1).toBe(stateSubscribe);
    expect(subscribeArg2).toBe(stateSubscribe);
  });

  it('skips undefined selectors on the adding new view models', () => {
    const stateValue = {};
    const stateSubscribe = jest.fn();
    const expectedViewModelKeys = ['B'];

    const manager = createViewModelManager();
    manager.addViewModels(stateValue, stateSubscribe, {
      A: undefined,
      B: jest.fn(),
    });
    const viewModels = manager.getViewModels();

    expect(createViewModelMock).toHaveBeenCalledTimes(1);
    expect(Object.keys(viewModels)).toEqual(expectedViewModelKeys);
  });

  it('dispose view model before replace it with new one', () => {
    const testViewModel = { ...viewModelMock };
    const firstASelector = jest.fn();
    createViewModelMock.mockImplementation(
      (_, __, selector) => (selector === firstASelector ? testViewModel : { ...viewModelMock }),
    );

    const manager = createViewModelManager();
    manager.addViewModels({}, jest.fn(), {
      A: firstASelector,
    });
    manager.addViewModels({}, jest.fn(), {
      A: jest.fn(),
      B: jest.fn(),
    });

    expect(testViewModel[DISPOSE]).toHaveBeenCalledTimes(1);
  });

  it('deletes view models', () => {
    const manager = createViewModelManager();
    manager.addViewModels({}, jest.fn(), {
      A: jest.fn(),
      B: jest.fn(),
      C: jest.fn(),
      D: jest.fn(),
    });
    manager.deleteViewModels('A', 'C');
    const viewModels = manager.getViewModels();

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
    manager.addViewModels({}, jest.fn(), {
      A: selectorA,
      B: jest.fn(),
      C: selectorC,
      D: jest.fn(),
    });
    manager.deleteViewModels('A', 'C');

    expect(disposeA).toHaveBeenCalledTimes(1);
    expect(disposeC).toHaveBeenCalledTimes(1);
  });

  it('do nothing on delete if view model with passed key doesn\'t exist', () => {
    const manager = createViewModelManager();
    manager.addViewModels({}, jest.fn(), {
      A: jest.fn(),
      B: jest.fn(),
    });
    manager.deleteViewModels('C');
    const viewModels = manager.getViewModels();

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
    manager.addViewModels({}, jest.fn(), {
      A: selectorA,
      B: selectorB,
    });
    manager[DISPOSE]();

    expect(disposeA).toHaveBeenCalledTimes(1);
    expect(disposeB).toHaveBeenCalledTimes(1);
  });
});
