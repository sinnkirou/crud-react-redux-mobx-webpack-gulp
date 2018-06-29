import { expect } from "chai";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import _ from "lodash";
import EditablePost from "../../src/Components/EditablePost";

describe("Editable post component testing", function () {
	beforeEach(() => {
		configure({ adapter: new Adapter() });
		this.props = {
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
	});

	afterEach(()=>{
		this.renderedComponent.unmount();
	});

	it("should render", () => {
		const props = _.cloneDeep(this.props);
		this.renderedComponent = shallow(<EditablePost {...props} />);
		expect(this.renderedComponent).to.have.lengthOf(1);
		const input = this.renderedComponent.find("input");
		expect(input).to.have.lengthOf(1);
		const textarea = this.renderedComponent.find("textarea");
		expect(textarea).to.have.lengthOf(1);
		const button = this.renderedComponent.find("button");
		expect(button).to.have.lengthOf(1);
	});

	it("should be able to add post", () => {
		const props = _.cloneDeep(this.props);
		let triggered = false;
		props.editing = false;
		props.addPost = () => {
			triggered = true;
		};
		this.renderedComponent = mount(<EditablePost {...props} />);
		const button = this.renderedComponent.find("button");
		expect(button.text()).to.equal("Submit");
		button.simulate("submit");
		expect(triggered).to.equal(true);
	});

	it("should be able to update post", () => {
		const props = _.cloneDeep(this.props);
		let triggered = false;
		props.editing = true;
		props.updatePost = () => {
			triggered = true;
		};
		this.renderedComponent = mount(<EditablePost {...props} />);
		const button = this.renderedComponent.find("button");
		expect(button.text()).to.equal("Update");
		button.simulate("submit");
		expect(triggered).to.equal(true);
	});
});
