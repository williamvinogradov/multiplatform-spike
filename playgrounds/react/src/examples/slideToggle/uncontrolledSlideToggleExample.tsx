import { DxSlideToggle } from '@dx/react/components/slideToggle';
import React, {useCallback} from 'react';

function UncontrolledSlideToggleExample() {
  const handleValueChange = useCallback((value: boolean) => alert(`value change fired with ${value}`), []);

  return (
    <div className="example">
      <div className="example__title">
        Uncontrolled mode
      </div>
      <div className="example__control">
        <DxSlideToggle defaultValue={false}
                       text={'React passed text'}
                       textPosition={'left'}
                       valueChange={handleValueChange}/>
      </div>
    </div>
  )
}

export {UncontrolledSlideToggleExample};
