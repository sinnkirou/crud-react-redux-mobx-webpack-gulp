import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./Reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { AppContainer } from "react-hot-loader";

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
	<AppContainer>
		<Provider store={store}>
			<App /> 
		</Provider>
	</AppContainer>,
	document.querySelector("#app")
);

if (module.hot) { // eslint-disable-line no-undef
	module.hot.accept(); // eslint-disable-line no-undef
}
