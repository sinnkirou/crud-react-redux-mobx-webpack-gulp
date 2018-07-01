import { expect } from "chai";
import { shallow, mount } from "enzyme";
import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import AllPosts from "../../src/Containers/AllPosts";

describe("AllPosts component testing", function () {
	beforeEach(() => {
		this.mockStore = configureStore();
	});

	it("should render", () => {
		const store = this.mockStore({});
		this.renderedComponent = shallow(<Provider store={store}><AllPosts /></Provider>);
		expect(this.renderedComponent).to.have.lengthOf(1);
	});

	it("should render viewable posts", () => {
		const store = this.mockStore({
			postReducer: [
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
			]
		});
		this.renderedComponent = mount(<Provider store={store}><AllPosts /></Provider>);
		const viewablePost = this.renderedComponent.find("ViewablePost");
		expect(viewablePost).to.have.lengthOf(2);
	});

	it("should render editable posts", () => {
		const store = this.mockStore({
			postReducer: [
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
			]
		});
		this.renderedComponent = mount(<Provider store={store}><AllPosts /></Provider>);
		this.renderedComponent.setState({id: 2});
		const editablePost = this.renderedComponent.find("EditablePost");
		expect(editablePost).to.have.lengthOf(1);
	});
    
	context("search box", () => {
		beforeEach(() => {
			const store = this.mockStore({
				postReducer: [
					{
						editing: false,
						message: "message",
						title: "title",
						id: 1
					}
				]
			});
			this.renderedComponent = mount(<Provider store={store}><AllPosts /></Provider>);
			this.searchBox = this.renderedComponent.find("input");
		});

		it("should render", () => {
			expect(this.searchBox).to.have.lengthOf(1);
		});

		it("should handle change and set state", () => {
            this.searchBox.value = "1";
            this.searchBox.simulate("change");
			expect(this.renderedComponent.state.id).to.equal("1");
		});
	});
});
