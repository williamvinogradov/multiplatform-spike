import { DISPOSE } from '../../utils';
import { createCoreComponent } from '../component';
import { createStateManager } from '../stateManager';
import { createViewModelManager } from '../viewModelManager';

jest.mock('../stateManager');
jest.mock('../viewModelManager');

const createStateStoreMock = jest.mocked(createStateManager);
const createViewModelStoreMock = jest.mocked(createViewModelManager);

describe('Core: Component', () => {
  const stateMock = { model: {}, dictionary: {} };

  beforeEach(() => {
    createStateStoreMock.mockReturnValue([{
      addUpdate: jest.fn(),
      rollbackUpdates: jest.fn(),
      commitUpdates: jest.fn(),
    }, {
      dispatch: jest.fn(),
    }]);
    createViewModelStoreMock.mockReturnValue({
      addViewModels: jest.fn(),
      deleteViewModels: jest.fn(),
      getViewModels: jest.fn(),
      [DISPOSE]: jest.fn(),
    });
  });

  afterAll(() => { jest.resetAllMocks(); });

  it('creates state manager', () => {
    createCoreComponent()(stateMock, {}, {});
    expect(createStateStoreMock).toHaveBeenCalledTimes(1);
  });

  it('creates view model manager', () => {
    createCoreComponent()(stateMock, {}, {});
    expect(createViewModelStoreMock).toHaveBeenCalledTimes(1);
  });

  it('calls view model dispose on dispose', () => {
    const disposeMock = jest.fn();
    createViewModelStoreMock.mockReturnValue({
      addViewModels: jest.fn(),
      deleteViewModels: jest.fn(),
      getViewModels: jest.fn(),
      [DISPOSE]: disposeMock,
    });

    const [root] = createCoreComponent()(stateMock, {}, {});
    root[DISPOSE]();

    expect(disposeMock).toHaveBeenCalledTimes(1);
  });
});
