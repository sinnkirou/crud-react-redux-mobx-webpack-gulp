import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import Router from './Router';

const App = () => (
  <BrowserRouter>
    <div className="App" key="App">
      <button
        id="demo-menu-lower-left"
        className="mdl-button mdl-js-button mdl-button--icon"
        type="button"
      >
        <i className="material-icons">more_vert</i>
      </button>
      <ul
        className="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect"
        htmlFor="demo-menu-lower-left"
      >
        <li className="mdl-menu__item">
          <Link to="/">Home</Link>
        </li>
        <li className="mdl-menu__item">
          <Link to="/posts">Posts</Link>
        </li>
      </ul>
      <Router key={Math.random()} />
    </div>
  </BrowserRouter>
);

export default App;
