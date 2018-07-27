import React from "react";
import ReactDOM from "react-dom";
import { App } from "./Components/App";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./Reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { AppContainer } from "react-hot-loader";

const store = createStore(rootReducer, applyMiddleware(thunk));
const approot = document.querySelector("#app");

ReactDOM.render(
	<AppContainer>
		<Provider store={store}>
			<App /> 
		</Provider>
	</AppContainer>,
	approot
);

if (module.hot) { // eslint-disable-line no-undef
	console.log("hot reloading active"); // eslint-disable-line no-console
	module.hot.accept("./Components/App", () => { // eslint-disable-line no-undef
		console.log("doing hot reload"); // eslint-disable-line no-console
		const NextApp = require("./Components/App").App; // eslint-disable-line no-undef
		ReactDOM.render(
			<AppContainer>
				<Provider store={store}>
					<NextApp />
				</Provider>
			</AppContainer>,
			approot
		);
	});
}