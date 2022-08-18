import React from 'react';
import { Routes, Route } from "react-router-dom";

import {PagerExample} from './examples/pagerExample';
import {SimpleButtonExample} from './examples/simpleButtonExample';
import {SimpleGridExample} from './examples/simpleGridExample';
import {SlideToggleExample} from './examples/slideToggleExample';
import {Home} from './home';

import './App.css';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/slideToggle" element={<SlideToggleExample />} />
        <Route path="/simpleButton" element={<SimpleButtonExample />} />
        <Route path="/pager" element={<PagerExample />} />
        <Route path="/simpleGrid" element={<SimpleGridExample />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
