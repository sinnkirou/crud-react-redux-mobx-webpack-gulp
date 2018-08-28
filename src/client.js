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
import LogManager from "../src/Log/LogManager";

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
	LogManager.getConsole().info("hot reloading active");

	// Enable Webpack hot module replacement for reducers
	module.hot.accept("./Reducers", () => {
		LogManager.getConsole().info("doing reduver hot reload");
		const nextRootReducer = require("./Reducers/index").default;
		store.replaceReducer(connectRouter(history)(nextRootReducer));
	});

	// Enable Webpack hot module replacement for react components
	module.hot.accept("./Components/App", () => {
		LogManager.getConsole().info("doing react componets hot reload");
		const NextApp = require("./Components/App").default; 
		render(NextApp);
	});
}
