import React, {useCallback, useState} from 'react';
import './App.css';
import { DxSlideToggle } from 'dx-react';


function App() {
  const [state, setState] = useState(true);

  const handleClick = useCallback(() => setState(!state), [state]);

  return (
    <React.Fragment>
      <DxSlideToggle  value={state}
                      text={'Hello!'}
                      valueChanged={(value: boolean) => {
                        console.log('on value changed: ', value);
                        setState(value);
                      }}/>
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
