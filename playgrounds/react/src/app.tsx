import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { RadioGroupExample } from './examples/radio-group/radio-group-example';
import { Home } from './home';

import './app.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/radio-group" element={<RadioGroupExample />} />
      </Routes>
    </>
  );
}

export default App;
