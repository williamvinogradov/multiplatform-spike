import {useEffect, useRef} from 'react';


const useSecondEffect = (
  func: () => void,
  deps: unknown[],
): void => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    func();
  }, [deps]);
}

export {useSecondEffect};
