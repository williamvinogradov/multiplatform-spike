import {useMemo} from 'react';
import {DxSlideToggleProps} from '../types/public';

const useIsControlled = (props: DxSlideToggleProps): boolean => {
  return useMemo(() => props.value !== undefined, []);
}

export {useIsControlled};
