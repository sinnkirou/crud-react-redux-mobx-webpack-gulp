import React from "react";
import { expect } from "chai";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import App from "../../src/Components/Router";

describe("routes", function () {
	beforeEach(() => {
		const mockStore = configureStore();
		this.store = mockStore({ postReducer: [] });
	});
    
	afterEach(()=>{
		this.renderedComponent.unmount();
	});

	it("should render postform", () => {
		this.renderedComponent = mount(
			<Provider store={this.store}>
				<MemoryRouter>
					<App />
				</MemoryRouter>
			</Provider>
		);
		const postForm = this.renderedComponent.find("PostForm");
		expect(postForm).to.have.lengthOf(1);
	});

	it("should render AllPosts", () => {
		this.renderedComponent = mount(
			<Provider store={this.store}>
				<MemoryRouter initialEntries={["/posts"]}>
					<App />
				</MemoryRouter>
			</Provider>
		);
		const allPosts = this.renderedComponent.find("AllPosts");
		expect(allPosts).to.have.lengthOf(1);
	});
});
