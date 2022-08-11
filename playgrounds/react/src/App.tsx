import React, {useCallback, useState} from 'react';
import { DxSlideToggle } from '@dx/react/components/slideToggle';
import { DxSimpleButton } from '@dx/react/components/simpleButton';

import './App.css';
// TODO: Think about the distribution of the CSS styles in react lib.
import '@dx/react/slideToggle.css';
import '@dx/react/simpleButton.css';

function App() {
  const [simpleState, setSimpleState] = useState(true);

  const handleSimpleClick = useCallback(() => setSimpleState(!simpleState), [simpleState]);

  const simpleValueChange = useCallback((value: boolean) => setSimpleState(value), []);

  return (
    <React.Fragment>
      {/* slideToggle component example */}
      <div className="example">
        <div className="example__title">
          Simple control example
        </div>
        <div className="example__control">
          <DxSlideToggle  value={simpleState}
                          text={'React passed text'}
                          valueChanged={simpleValueChange}/>
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

      {/* simpleButton component example */}
      <div className="example">
        <div className="example__title">
          Simple button example
        </div>
        <div className="example__control">
          <DxSimpleButton text="hello!" />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
