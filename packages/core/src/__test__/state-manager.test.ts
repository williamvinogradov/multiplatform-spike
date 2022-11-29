import { createStateManager } from '../state-manager';

describe('Core', () => {
  describe('StateManager', () => {
    describe('getCurrent', () => {
      it('returns the current state', () => {
        const state = { a: 1 };

        const manager = createStateManager(state);
        const result = manager.getCurrent();

        expect(result).toBe(state);
      });

      it('returns the same current state if updates were added', () => {
        const state = { a: 1 };
        const newState = { a: 2 };

        const manager = createStateManager(state);
        manager.scheduleUpdate(() => newState);
        const result = manager.getCurrent();

        expect(result).toBe(state);
      });

      it('returns the current state after commitUpdates', () => {
        const state = { a: 1 };
        const newState = { a: 2 };

        const manager = createStateManager(state);
        manager.scheduleUpdate(() => newState);
        manager.commitUpdates();
        const result = manager.getCurrent();

        expect(result).toEqual(newState);
      });
    });

    describe('getNext', () => {
      it('returns the current state if no updates were added', () => {
        const state = {};

        const manager = createStateManager(state);
        const result = manager.getNext();

        expect(result).toBe(state);
      });

      it('returns the updated state if updates were added', () => {
        const state = { a: 1 };
        const expectedState = { a: 2 };

        const manager = createStateManager(state);
        manager.scheduleUpdate(() => expectedState);
        const result = manager.getNext();

        expect(result).toEqual(expectedState);
      });

      it('returns the current state after commitUpdates', () => {
        const state = { a: 1 };
        const expectedState = { a: 2 };

        const manager = createStateManager(state);
        manager.scheduleUpdate(() => expectedState);
        manager.commitUpdates();
        const result = manager.getNext();

        expect(result).toEqual(expectedState);
      });
    });

    describe('scheduleUpdate', () => {
      it('stores an added update in the next state', () => {
        const state = { a: 1 };
        const newState = { a: 2 };

        const manager = createStateManager(state);
        manager.scheduleUpdate(() => newState);
        const result = manager.getNext();

        expect(result).toEqual(newState);
      });

      it('does a partial update of the current state', () => {
        const state = { a: 1, b: 2 };
        const updatePart = { b: 3 };
        const expectedState = { ...state, ...updatePart };

        const manager = createStateManager(state);
        manager.scheduleUpdate(() => updatePart);
        manager.commitUpdates();
        const result = manager.getCurrent();

        expect(result).toEqual(expectedState);
      });

      it('does not affect the current state', () => {
        const state = { a: 1 };
        const newState = { a: 2 };

        const manager = createStateManager(state);
        manager.scheduleUpdate(() => newState);
        const result = manager.getCurrent();

        expect(result).toEqual(state);
      });
    });

    describe('commitUpdates', () => {
      it('writes updated state to the current state', () => {
        const state = { a: 1 };
        const newState = { a: 2 };

        const manager = createStateManager(state);
        manager.scheduleUpdate(() => newState);
        manager.commitUpdates();
        const result = manager.getCurrent();

        expect(result).toEqual(newState);
      });
    });

    describe('rollbackUpdates', () => {
      it('rollbacks updated state to the current state', () => {
        const state = { a: 1 };
        const newState = { a: 2 };

        const manager = createStateManager(state);
        manager.scheduleUpdate(() => newState);
        manager.rollbackUpdates();
        const result = manager.getNext();

        expect(result).toEqual(state);
      });

      it('does not affect the current state', () => {
        const state = { a: 1 };
        const newState = { a: 2 };

        const manager = createStateManager(state);
        manager.scheduleUpdate(() => newState);
        manager.rollbackUpdates();
        const result = manager.getCurrent();

        expect(result).toBe(state);
      });
    });
  });
});
