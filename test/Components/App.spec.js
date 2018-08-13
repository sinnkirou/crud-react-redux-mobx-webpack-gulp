import { expect } from "chai";
import { mount } from "enzyme";
import React from "react";
import App from "../../src/Components/App";
import PostForm from "../../src/Containers/PostForm";
import { MemoryRouter } from "react-router-dom";

describe("App component testing", function () {
	beforeEach(() => {
		this.renderedComponent = mount(<MemoryRouter initialEntries={[ "/" ]} initialIndex={0}><App /></MemoryRouter>);
		console.log(this.renderedComponent.html());
	});

	it("should render", () => {
		expect(this.renderedComponent).to.have.lengthOf(1);
		// const postForm = this.renderedComponent.find("PostForm");
		// expect(postForm).to.have.lengthOf(1);
	});
});
