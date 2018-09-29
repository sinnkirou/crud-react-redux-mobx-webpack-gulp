/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AppContainer } from 'react-hot-loader';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import rootReducer from './Reducers';
import App from './Components/App';

const history = createBrowserHistory();
const store = createStore(
  connectRouter(history)(rootReducer),
  applyMiddleware(routerMiddleware(history), thunk)
);
const approot = document.querySelector('#app');

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component history={history} />
      </Provider>
    </AppContainer>,
    approot
  );
};

render(App);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./Reducers', () => {
    const nextRootReducer = require('./Reducers/index').default;
    store.replaceReducer(connectRouter(history)(nextRootReducer));
  });

  // Enable Webpack hot module replacement for react components
  module.hot.accept('./Components/App', () => {
    const NextApp = require('./Components/App').default;
    render(NextApp);
  });
}
