import React from 'react';
import {DxSimpleButton} from '@dx/react/components/simpleButton';
import '@dx/react/simpleButton.css';


function SimpleButtonExample() {
  return <React.Fragment>
    <div className="example">
      <div className="example__title">
        Simple button example
      </div>
      <div className="example__control">
        <DxSimpleButton text="hello!"/>
      </div>
    </div>
  </React.Fragment>
}

export {
  SimpleButtonExample,
}
