import {MutableRefObject, useMemo, useRef} from 'react';
import {ReactCallbacks} from '../types';


const useCallbackCollector = <TModel>(
  callbacks: ReactCallbacks<TModel>,
): MutableRefObject<ReactCallbacks<TModel>> => {
  const ref = useRef(callbacks);
  useMemo(() => {
    ref.current = callbacks;
  }, [callbacks]);

  return ref;
}

export {useCallbackCollector};
