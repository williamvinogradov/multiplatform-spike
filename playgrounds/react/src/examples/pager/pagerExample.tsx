import React from 'react';

import {ControlledPagerExample} from './controlledPagerExample';
import {CustomizationExample} from './customizationExample';
import {UncontrolledPagerExample} from './uncontrolledPagerExample';

import '@dx/react/pager.css';


function PagerExample() {
  return <React.Fragment>
    {/*Controlled pager*/}
    <ControlledPagerExample/>

    {/*Uncontrolled pager*/}
    <UncontrolledPagerExample />

    {/*Customization*/}
    <CustomizationExample />
  </React.Fragment>
}

export {
  PagerExample,
}
