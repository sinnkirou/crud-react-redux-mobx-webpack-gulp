import { expect } from "chai";
import { shallow } from "enzyme";
import React from "react";
import App from "../../src/Components/App";
import PostForm from "../../src/Containers/PostForm";
import AllPosts from "../../src/Containers/AllPosts";

describe("App component testing", function () {
	beforeEach(() => {
		this.renderedComponent = shallow(<App />);
	});

	it("should render", () => {
		expect(this.renderedComponent).to.have.lengthOf(1);
		const postItTitle = this.renderedComponent.find("h2.center");
		expect(postItTitle).to.have.lengthOf(1);
		const postForm = this.renderedComponent.find(PostForm);
		expect(postForm).to.have.lengthOf(1);
		const allPosts = this.renderedComponent.find(AllPosts);
		expect(allPosts).to.have.lengthOf(1);
	});
});
