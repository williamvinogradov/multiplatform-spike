import React from 'react';
import {Routes, Route} from 'react-router-dom';

import {PagerExample} from './examples/pager/pagerExample';
import {SlideToggleExample} from './examples/slideToggle/slideToggleExample';
import {Home} from './home';

import './App.css';
import { WrappedSelectBoxExample } from './examples/wrapped-selectbox';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/slideToggle" element={<SlideToggleExample/>}/>
        <Route path="/pager" element={<PagerExample/>}/>
        <Route path="/wrapped-selectbox" element={<WrappedSelectBoxExample/>}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
