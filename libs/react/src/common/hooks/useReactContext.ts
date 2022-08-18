import React, {useContext} from 'react';

function useReactContext<TContext>(context: React.Context<TContext>): TContext {
  const result = useContext(context);

  if (!result) {
    throw Error(`Context not provided!`);
  }

  return result;
}

export {
  useReactContext,
}
