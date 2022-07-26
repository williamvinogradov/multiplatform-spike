import React, {useContext} from "react";

function getContext<TContextType>(context: React.Context<TContextType | undefined>): TContextType {
  const contextValue = useContext<TContextType | undefined>(context);
  if (!contextValue) {
    throw Error(`getContext: context ${context} must be set!`);
  }

  return contextValue;
}

export {getContext}