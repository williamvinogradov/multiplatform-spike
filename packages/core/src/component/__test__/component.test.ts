import { DISPOSE } from '../../utils';
import { createCore } from '../index';
import { createStateManager } from '../stateManager';
import { createViewModelManager } from '../viewModelManager';

jest.mock('../stateManager');
jest.mock('../viewModelManager');

const createStateManagerMock = jest.mocked(createStateManager);
const createViewModelManagerMock = jest.mocked(createViewModelManager);

describe('Core: Component', () => {
  const stateMock = { model: {}, dictionary: {} };

  beforeEach(() => {
    createStateManagerMock.mockReturnValue([{
      addUpdate: jest.fn(),
      rollbackUpdates: jest.fn(),
      commitUpdates: jest.fn(),
    }, {
      dispatch: jest.fn(),
    }]);
    createViewModelManagerMock.mockReturnValue({
      add: jest.fn(),
      remove: jest.fn(),
      get: jest.fn(),
      [DISPOSE]: jest.fn(),
    });
  });

  afterAll(() => { jest.resetAllMocks(); });

  it('creates state manager', () => {
    createCore()(stateMock, {}, {});
    expect(createStateManagerMock).toHaveBeenCalledTimes(1);
  });

  it('creates view model manager', () => {
    createCore()(stateMock, {}, {});
    expect(createViewModelManagerMock).toHaveBeenCalledTimes(1);
  });

  it('calls view model dispose on dispose', () => {
    const disposeMock = jest.fn();
    createViewModelManagerMock.mockReturnValue({
      add: jest.fn(),
      remove: jest.fn(),
      get: jest.fn(),
      [DISPOSE]: disposeMock,
    });

    const [root] = createCore()(stateMock, {}, {});
    root[DISPOSE]();

    expect(disposeMock).toHaveBeenCalledTimes(1);
  });
});
