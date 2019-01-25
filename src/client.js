/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createBrowserHistory } from 'history';
import App from './Components/App';
import Store from './Store';

Store.initPosts();
const history = createBrowserHistory();
const approot = document.querySelector('#app');

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component history={history} />
    </AppContainer>,
    approot
  );
};

render(App);

if (module.hot) {
  // Enable Webpack hot module replacement for react components
  module.hot.accept('./Components/App', () => {
    const NextApp = require('./Components/App').default;
    render(NextApp);
  });
}
