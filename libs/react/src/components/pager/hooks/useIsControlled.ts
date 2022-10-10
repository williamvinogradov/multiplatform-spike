import {useMemo} from 'react';
import {DxPagerProps} from '../types/public';


const useIsControlled = (props: DxPagerProps): boolean => {
  return useMemo(() =>
    props.selectedPage !== undefined
    && props.selectedPageSize !== undefined, []);
}

export {useIsControlled};
