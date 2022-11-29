import { controlledModeMiddleware } from '../../middlewares';
import { updateState } from '../update-state';

jest.mock('../../middlewares');

const stateManagerMock = {
  getCurrent: jest.fn(),
  getNext: jest.fn(),
  scheduleUpdate: jest.fn(),
  commitUpdates: jest.fn(),
  rollbackUpdates: jest.fn(),
};

const controlledModeMiddlewareMock = jest.mocked(controlledModeMiddleware);

describe('Core: Store', () => {
  describe('updateState', () => {
    beforeEach(() => {
      controlledModeMiddlewareMock.mockReturnValue([{}, false]);
    });

    it('calls controlledModeMiddleware', () => {
      const currentState = {};
      const validatedState = {};
      const stateConfig = {};

      updateState(currentState, validatedState, {
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

        const result = updateState({}, {},
          { stateConfig: {}, stateManager: stateManagerMock });

        expect(result).toBe(hasChanges);
      });
    });

    it('updates state if the middleware returns hasChanges = true', () => {
      const newState = {};
      controlledModeMiddlewareMock.mockReturnValue([newState, true]);

      updateState({}, {},
        { stateConfig: {}, stateManager: stateManagerMock });

      const [updateFunc] = stateManagerMock.scheduleUpdate.mock.calls[0];
      expect(updateFunc()).toBe(newState);
      expect(stateManagerMock.commitUpdates).toHaveBeenCalledTimes(1);
    });

    it('does not update state if the middleware returns hasChanges = false', () => {
      controlledModeMiddlewareMock.mockReturnValue([{}, false]);

      updateState({}, {},
        { stateConfig: {}, stateManager: stateManagerMock });

      expect(stateManagerMock.scheduleUpdate).not.toHaveBeenCalled();
      expect(stateManagerMock.commitUpdates).not.toHaveBeenCalled();
    });
  });
});
