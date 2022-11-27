import { controlledModeMiddleware } from '../../middlewares';
import { changeState } from '../change-state';

jest.mock('../../middlewares');

const stateManagerMock = {
  getCurrent: jest.fn(),
  getNext: jest.fn(),
  addUpdate: jest.fn(),
  commitUpdates: jest.fn(),
  rollbackUpdates: jest.fn(),
};

const controlledModeMiddlewareMock = jest.mocked(controlledModeMiddleware);

describe('Core: Store', () => {
  describe('changeState', () => {
    beforeEach(() => {
      controlledModeMiddlewareMock.mockReturnValue([{}, false]);
    });

    it('calls controlledModeMiddleware', () => {
      const currentState = {};
      const validatedState = {};
      const stateConfig = {};

      changeState(currentState, validatedState, {
        stateConfig,
        stateManager: stateManagerMock,
      });

      expect(controlledModeMiddlewareMock).toHaveBeenCalledWith(
        currentState,
        validatedState,
        stateConfig,
      );
    });

    [true, false].forEach((hasChanges) => {
      it(`returns ${hasChanges} if the middleware returns hasChanges=${hasChanges}`, () => {
        controlledModeMiddlewareMock.mockReturnValue([{}, hasChanges]);

        const result = changeState({}, {},
          { stateConfig: {}, stateManager: stateManagerMock });

        expect(result).toBe(hasChanges);
      });
    });

    it('updates state if the middleware returns hasChanges = true', () => {
      const newState = {};
      controlledModeMiddlewareMock.mockReturnValue([newState, true]);

      changeState({}, {},
        { stateConfig: {}, stateManager: stateManagerMock });

      const [updateFunc] = stateManagerMock.addUpdate.mock.calls[0];
      expect(updateFunc()).toBe(newState);
      expect(stateManagerMock.commitUpdates).toHaveBeenCalledTimes(1);
    });

    it('does not update state if the middleware returns hasChanges = false', () => {
      controlledModeMiddlewareMock.mockReturnValue([{}, false]);

      changeState({}, {},
        { stateConfig: {}, stateManager: stateManagerMock });

      expect(stateManagerMock.addUpdate).not.toHaveBeenCalled();
      expect(stateManagerMock.commitUpdates).not.toHaveBeenCalled();
    });
  });
});
