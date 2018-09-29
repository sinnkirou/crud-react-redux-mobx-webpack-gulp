import React from 'react';
import { Link } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import Router from './Router';

const App = ({ history }) => (
  <ConnectedRouter history={history}>
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
  </ConnectedRouter>
);

export default App;

App.propTypes = {
  history: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};
