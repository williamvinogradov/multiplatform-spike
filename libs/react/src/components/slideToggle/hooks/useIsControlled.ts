import {useMemo} from 'react';
import {DxSlideToggleProps} from '../dxSlideToggle';

const useIsControlled = (props: DxSlideToggleProps): boolean => {
  return useMemo(() => props.value !== undefined, []);
}

export {useIsControlled};
