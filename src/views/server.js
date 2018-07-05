import React from "react";
import {hydrate} from "react-dom";
import App from "../Components/App";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../Reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const preloadedState = window.__STATE__;

delete window.__STATE__;

const store = createStore(
	rootReducer,
	preloadedState,
	applyMiddleware(
		thunk
	)
);

hydrate(
	<Provider store={store} >
		<App />
	</Provider>,
	document.querySelector("#app")
);
