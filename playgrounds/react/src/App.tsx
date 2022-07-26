import React, {useMemo, useState} from 'react';
import './App.css';
import { DxSlideToggle } from '@dx/react';


function App() {
  const [state, setState] = useState(true);

  const handleClick = () => setState(!state);

  return (
    <React.Fragment>
      <DxSlideToggle  value={state}
                      text={'Hello!'}
                      valueChanged={(value) => setState(value)}/>
      <button onClick={handleClick}>
        Toggle
      </button>
      <div>
        App value: {state.toString()}
      </div>
    </React.Fragment>
  );
}

export default App;
