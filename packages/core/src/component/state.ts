import { createObservable, ObjectType, Observable } from '../utils';

export interface StateValue<TModel, TDictionary> {
  model: TModel;
  dictionary: TDictionary;
}

export interface State<TModel, TDictionary>
  extends Observable<StateValue<TModel, TDictionary>>{
  getValue: () => StateValue<TModel, TDictionary>;
  addUpdateChunk: (statePart: Partial<StateValue<Partial<TModel>, Partial<TDictionary>>>) => void;
  commitUpdates: () => void;
  rollbackUpdates: () => void;
}

export const createState = <TModel extends ObjectType, TDictionary extends ObjectType>(
  initialState: StateValue<TModel, TDictionary>,
): State<TModel, TDictionary> => {
  let current = initialState;
  let next = initialState;

  const { emit, subscribe } = createObservable<StateValue<TModel, TDictionary>>();

  const getValue = () => current;

  const addUpdate = (
    statePart: Partial<StateValue<Partial<TModel>, Partial<TDictionary>>>,
  ): void => {
    next = {
      model: {
        ...next.model,
        ...statePart.model,
      },
      dictionary: {
        ...next.dictionary,
        ...statePart.dictionary,
      },
    };
  };

  const commitUpdates = () => {
    current = next;
  };

  const rollbackUpdates = () => {
    next = current;
  };

  return {
    emit,
    subscribe,
    getValue,
    addUpdateChunk: addUpdate,
    commitUpdates,
    rollbackUpdates,
  };
};
