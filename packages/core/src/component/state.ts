import { createObservable, ObjectType, Observable } from '../utils';

export interface StateValue<TModel, TDictionary> {
  model: TModel;
  dictionary: TDictionary;
}

export interface State<TModel, TDictionary>
  extends Observable<StateValue<TModel, TDictionary>>{
  getValue: () => StateValue<TModel, TDictionary>;
  addUpdate: (statePart: Partial<StateValue<Partial<TModel>, Partial<TDictionary>>>) => void;
  commitUpdate: (rollback?: boolean) => void;
}

export const createState = <TModel, TDictionary>(
  initialState: StateValue<ObjectType<TModel>, ObjectType<TDictionary>>,
): State<TModel, TDictionary> => {
  let stateValue = initialState;
  let updatedStateValue = initialState;

  const { emit, subscribe } = createObservable<StateValue<TModel, TDictionary>>();

  const getValue = () => stateValue;

  const addUpdate = (
    statePart: Partial<StateValue<Partial<TModel>, Partial<TDictionary>>>,
  ): void => {
    updatedStateValue = {
      model: {
        ...updatedStateValue.model,
        ...statePart.model,
      },
      dictionary: {
        ...updatedStateValue.dictionary,
        ...statePart.dictionary,
      },
    };
  };

  const commitUpdate = (rollback = false) => {
    updatedStateValue = rollback ? stateValue : updatedStateValue;
    stateValue = updatedStateValue;
  };

  return {
    emit,
    subscribe,
    getValue,
    addUpdate,
    commitUpdate,
  };
};
