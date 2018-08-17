import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./Reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { AppContainer } from "react-hot-loader";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";

const history = createBrowserHistory();
const store = createStore(
	connectRouter(history)(rootReducer),
	applyMiddleware(routerMiddleware(history), thunk)
);
const approot = document.querySelector("#app");

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
	// eslint-disable-line no-undef
	console.log("hot reloading active"); // eslint-disable-line no-console

	// Enable Webpack hot module replacement for reducers
	module.hot.accept("./Reducers", () => {
		// eslint-disable-line no-undef
		console.log("doing reduver hot reload"); // eslint-disable-line no-console
		const nextRootReducer = require("./Reducers/index").default; // eslint-disable-line no-undef
		store.replaceReducer(connectRouter(history)(nextRootReducer));
	});

	// Enable Webpack hot module replacement for react components
	module.hot.accept("./Components/App", () => {
		// eslint-disable-line no-undef
		console.log("doing react componets hot reload"); // eslint-disable-line no-console
		const NextApp = require("./Components/App").default; // eslint-disable-line no-undef
		render(NextApp);
	});
}
