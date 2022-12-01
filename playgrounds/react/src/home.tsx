import React from 'react';
import { Link } from 'react-router-dom';

import './home.css';

function Home() {
  return (
    <div className="link-list">
      <Link to="/radio-group">Radio Group</Link>
      <Link to="/radio-button">Radio Button</Link>
    </div>
  );
}

export { Home };
