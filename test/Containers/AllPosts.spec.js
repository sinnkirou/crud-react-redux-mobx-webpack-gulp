import { expect } from "chai";
import { shallow } from "enzyme";
import React from "react";
import { AllPosts } from "../../src/Containers/AllPosts";

describe("AllPosts component testing", function () {

	const getDefaualtProps = () => ({
		editPost: () => { },
		deletePost: () => { },
		updatePost: () => { },
		posts: []
	});

	it("should render viewable posts", () => {
		const props = getDefaualtProps();
		props.posts = [
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


		this.renderedComponent = shallow(<AllPosts {...props} />);
		expect(this.renderedComponent).to.have.lengthOf(1);
		const viewablePost = this.renderedComponent.find("ViewablePost");
		expect(viewablePost).to.have.lengthOf(2);
	});

	it("should render editable posts", () => {
		const props = getDefaualtProps();
		props.posts = [
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
		this.renderedComponent = shallow(<AllPosts {...props} />);
		expect(this.renderedComponent).to.have.lengthOf(1);
		this.renderedComponent.setState({ id: 2 });
		const editablePost = this.renderedComponent.find("EditablePost");
		expect(editablePost).to.have.lengthOf(1);
	});

	context("search box", () => {
		beforeEach(() => {
			const props = getDefaualtProps();
			props.posts = [
				{
					editing: false,
					message: "message",
					title: "title",
					id: 1
				}
			];
			this.renderedComponent = shallow(<AllPosts {...props} />);
			this.searchBox = this.renderedComponent.find("input");
		});

		it("should render", () => {
			expect(this.renderedComponent).to.have.lengthOf(1);
			expect(this.searchBox).to.have.lengthOf(1);
		});

		it("should not render when no posts", () => {
			this.renderedComponent.setProps({posts: []});
			this.searchBox = this.renderedComponent.find("input");
			expect(this.searchBox).to.have.lengthOf(0);
		});

		it("should display at least one post when search successfully", () => {
			expect(this.renderedComponent.state().id).to.equal("");
			this.searchBox.simulate("change", {
				target:
					{ value: "1" },
				preventDefault() { }
			});
			expect(this.renderedComponent.state().id).to.equal("1");
			const viewablePost = this.renderedComponent.find("ViewablePost");
			expect(viewablePost).to.have.lengthOf(1);
		});

		it("should display none when search failed", () => {
			expect(this.renderedComponent.state().id).to.equal("");
			this.searchBox.simulate("change", {
				target:
					{ value: "2" },
				preventDefault() { }
			});
			expect(this.renderedComponent.state().id).to.equal("2");
			const viewablePost = this.renderedComponent.find("ViewablePost");
			expect(viewablePost).to.have.lengthOf(0);
		});
	});
});
