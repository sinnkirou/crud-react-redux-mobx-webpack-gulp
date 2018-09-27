import { expect } from "chai";
import { shallow } from "enzyme";
import React from "react";
import { PostForm, mapDispatchToProps } from "../../src/Containers/PostForm";

// Testing with unconnected component.
describe("PostForm component testing", () => {

	const getDefaualtProps = () => ({
		addPost: () => { }
	});

	it("should render", () => {
		const props = getDefaualtProps();
		const renderedComponent = shallow(<PostForm {...props} />);
		expect(renderedComponent).to.have.lengthOf(1);
		const post_heading = renderedComponent.find("h1.post_heading");
		expect(post_heading).to.have.lengthOf(1);
		const editablePost = renderedComponent.find("EditablePost");
		expect(editablePost).to.have.lengthOf(1);
	});

	it("mapDispatchToProps should work", () => {
		let type= "";
		const dispatch = (callback)=>{
			if(callback)
				type = callback.type;
		};
		mapDispatchToProps(dispatch).addPost({});
		expect(type).to.equal( "ADD_POST");
	});
});
