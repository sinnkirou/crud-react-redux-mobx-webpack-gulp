import { expect } from "chai";
import { shallow, mount } from "enzyme";
import React from "react";
import _ from "lodash";
import EditablePost from "../../src/Components/EditablePost";

describe("Editable post component testing", () => {
	const defaultProps = {
		post: {
			editing: false,
			message: "message",
			title: "title",
			id: 1
		},
		editing: true,
		updatePost: () => { },
		addPost: () => { }
	};
	let renderedComponent;

	afterEach(()=>{
		renderedComponent.unmount();
	});

	it("should render prefilled post", () => {
		const props = _.cloneDeep(defaultProps);
		renderedComponent = shallow(<EditablePost {...props} />);
		expect(renderedComponent).to.have.lengthOf(1);
		const input = renderedComponent.find("input");
		expect(input).to.have.lengthOf(1);
		const textarea = renderedComponent.find("textarea");
		expect(textarea).to.have.lengthOf(1);
		const button = renderedComponent.find("button");
		expect(button).to.have.lengthOf(1);
	});

	it("should be able to add post", () => {
		const props = _.cloneDeep(defaultProps);
		props.post = undefined;
		let triggered = false;
		props.editing = false;
		props.addPost = () => {
			triggered = true;
		};
		renderedComponent = mount(<EditablePost {...props} />);
		const button = renderedComponent.find("button");
		expect(button.text()).to.equal("Submit");
		button.simulate("submit");
		expect(triggered).to.equal(true);
	});

	it("should be able to update post", () => {
		const props = _.cloneDeep(defaultProps);
		let triggered = false;
		props.editing = true;
		props.updatePost = () => {
			triggered = true;
		};
		renderedComponent = mount(<EditablePost {...props} />);
		const button = renderedComponent.find("button");
		expect(button.text()).to.equal("Update");
		button.simulate("submit");
		expect(triggered).to.equal(true);
	});
});
