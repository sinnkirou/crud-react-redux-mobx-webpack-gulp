import { expect } from "chai";
import { shallow } from "enzyme";
import React from "react";
import { PostForm } from "../../src/Containers/PostForm";

// Testing with unconnected component.
describe("PostForm component testing", function () {

	const getDefaualtProps = () => ({
		addPost: () => { }
	});

	it("should render", () => {
		const props = getDefaualtProps();
		this.renderedComponent = shallow(<PostForm {...props} />);
		expect(this.renderedComponent).to.have.lengthOf(1);
		const post_heading = this.renderedComponent.find("h1.post_heading");
		expect(post_heading).to.have.lengthOf(1);
		const editablePost = this.renderedComponent.find("EditablePost");
		expect(editablePost).to.have.lengthOf(1);
	});
});
