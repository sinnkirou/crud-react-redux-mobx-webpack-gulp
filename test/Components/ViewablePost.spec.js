import { expect } from "chai";
import { shallow } from "enzyme";
import React from "react";
import _ from "lodash";
import ViewablePost from "../../src/Components/ViewablePost";

describe("Viewable post component testing", () => {
	const defaultProps = {
		post: {
			editing: false,
			message: "message",
			title: "title",
			id: 1
		},
		editPost: () => { },
		deletePost: () => { }
	};

	it("should render", () => {
		const props = _.cloneDeep(defaultProps);
		const renderedComponent = shallow(<ViewablePost {...props} />);
		expect(renderedComponent).to.have.lengthOf(1);
		const post_title = renderedComponent.find("h2.post_title");
		expect(post_title).to.have.lengthOf(1);
		const post_message = renderedComponent.find("p.post_message");
		expect(post_message).to.have.lengthOf(1);
		const editButton = renderedComponent.find("button.edit");
		expect(editButton).to.have.lengthOf(1);
		const deleteButton = renderedComponent.find("button.delete");
		expect(deleteButton).to.have.lengthOf(1);
	});

	it("should be able to edit post", () => {
		const props = _.cloneDeep(defaultProps);
		let triggered = false;
		props.editPost = () => {
			triggered = true;
		};
		const renderedComponent = shallow(<ViewablePost {...props} />);
		const editButton = renderedComponent.find("button.edit");
		editButton.simulate("click");
		expect(triggered).to.equal(true);
	});

	it("should be able to delete post", () => {
		const props = _.cloneDeep(defaultProps);
		let triggered = false;
		props.deletePost = () => {
			triggered = true;
		};
		const renderedComponent = shallow(<ViewablePost {...props} />);
		const deleteButton = renderedComponent.find("button.delete");
		deleteButton.simulate("click");
		expect(triggered).to.equal(true);
	});
});
