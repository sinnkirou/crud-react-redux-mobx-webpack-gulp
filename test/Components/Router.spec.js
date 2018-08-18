import React from "react";
import { expect } from "chai";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import App, { PostForm as LoadablePostForm, AllPosts as LoadableAllPosts} from "../../src/Components/Router";
import sinon from "sinon";
import PostForm from "../../src/Containers/PostForm";
import AllPosts from "../../src/Containers/AllPosts";

describe("routes", function () {
	beforeEach(() => {
		const mockStore = configureStore();
		this.store = mockStore({ postReducer: [] });
		this.sandbox = sinon.createSandbox();
	});
    
	afterEach(() => {
		this.renderedComponent.unmount();
		this.sandbox.restore();
	});

	it("should render loading", () => {
		this.renderedComponent = mount(
			<Provider store={this.store}>
				<MemoryRouter>
					<App />
				</MemoryRouter>
			</Provider>
		);
		const postForm = this.renderedComponent.find("Loading");
		expect(postForm).to.have.lengthOf(1);
	});


	it("should render postform", () => {
		this.sandbox.stub(LoadablePostForm.prototype, "render").callsFake(()=>(<PostForm/>));
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
		this.sandbox.stub(LoadableAllPosts.prototype, "render").callsFake(()=>(<AllPosts/>));
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
