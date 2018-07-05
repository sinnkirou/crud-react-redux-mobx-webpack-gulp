import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import App from "../Components/App";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../Reducers";
import thunk from "redux-thunk";

const render = () => {
	const store = createStore(rootReducer, applyMiddleware(thunk));
	let content = renderToString(
		<Provider store={store} >
			<App />
		</Provider>
	);

	const preloadedState = store.getState();

	return { content, preloadedState };
};

export default render;