import React, {useCallback, useState} from 'react';
import {DxSlideToggle} from '@dx/react/components/slideToggle';
import '@dx/react/slideToggle.css';

function SlideToggleExample() {
  const [simpleState, setSimpleState] = useState(true);
  const handleSimpleClick = useCallback(() => setSimpleState(!simpleState), [simpleState]);
  const simpleValueChange = useCallback((value: boolean) => setSimpleState(value), []);

  return <React.Fragment>
    <div className="example">
      <div className="example__title">
        Simple control example
      </div>
      <div className="example__control">
        <DxSlideToggle value={simpleState}
        text={'React passed text'}
        valueChange={simpleValueChange}/>
      </div>
      <div className="example__info">
        <button onClick={handleSimpleClick}>
          Toggle
        </button>
        <div>
          App value: {simpleState.toString()}
        </div>
      </div>
    </div>
  </React.Fragment>
}

export {
  SlideToggleExample,
}
