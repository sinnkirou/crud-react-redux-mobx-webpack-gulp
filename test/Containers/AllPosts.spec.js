import { expect } from "chai";
import { shallow } from "enzyme";
import React from "react";
import AllPosts from "../../src/Containers/AllPosts";
import configureStore from "redux-mock-store";

// Testing with connected component.
describe("AllPosts component testing", function () {
	const mockStore = configureStore();

	it("should render viewable posts", () => {
		const initialState = [
			{
				editing: false,
				message: "message",
				title: "title",
				id: 1
			},
			{
				editing: false,
				message: "message2",
				title: "title2",
				id: 2
			}
		];

		const store = mockStore({postReducer: initialState});
		this.renderedComponent = shallow(<AllPosts store={store} />).dive();
		expect(this.renderedComponent).to.have.lengthOf(1);
		const viewablePost = this.renderedComponent.find("ViewablePost");
		expect(viewablePost).to.have.lengthOf(2);
	});

	it("should render editable posts", () => {
		const initialState = [
			{
				editing: false,
				message: "message",
				title: "title",
				id: 1
			},
			{
				editing: true,
				message: "message",
				title: "title",
				id: 2
			}
		];
		const store = mockStore({postReducer: initialState});
		this.renderedComponent = shallow(<AllPosts store={store} />).dive();
		expect(this.renderedComponent).to.have.lengthOf(1);
		this.renderedComponent.setState({ id: 2 });
		const editablePost = this.renderedComponent.find("EditablePost");
		expect(editablePost).to.have.lengthOf(1);
	});

	context("search box when posts exist", () => {
		beforeEach(() => {
			const initialState = [
				{
					editing: false,
					message: "message",
					title: "title",
					id: 1
				}
			];
			const store = mockStore({postReducer: initialState});
			this.renderedComponent = shallow(<AllPosts store={store} />).dive();
			this.searchBox = this.renderedComponent.find("input");
		});

		it("should render", () => {
			expect(this.renderedComponent).to.have.lengthOf(1);
			expect(this.searchBox).to.have.lengthOf(1);
		});

		it("should display at least one post when search successfully", () => {
			expect(this.renderedComponent.instance().state.id).to.equal("");
			this.searchBox.simulate("change", {
				target:
					{ value: "1" },
				preventDefault() { }
			});
			expect(this.renderedComponent.instance().state.id).to.equal("1");
			const viewablePost = this.renderedComponent.find("ViewablePost");
			expect(viewablePost).to.have.lengthOf(1);
		});

		it("should display none when search failed", () => {
			expect(this.renderedComponent.instance().state.id).to.equal("");
			this.searchBox.simulate("change", {
				target:
					{ value: "2" },
				preventDefault() { }
			});
			expect(this.renderedComponent.instance().state.id).to.equal("2");
			const viewablePost = this.renderedComponent.find("ViewablePost");
			expect(viewablePost).to.have.lengthOf(0);
		});
	});

	context("search box when no posts", () => {
		beforeEach(() => {
			const initialState = [];
			const store = mockStore({postReducer: initialState});
			this.renderedComponent = shallow(<AllPosts store={store} />).dive();
			this.searchBox = this.renderedComponent.find("input");
		});

		it("should not render", () => {
			this.searchBox = this.renderedComponent.find("input");
			expect(this.searchBox).to.have.lengthOf(0);
		});
	});
});
