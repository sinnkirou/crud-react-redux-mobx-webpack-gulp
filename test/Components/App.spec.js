import { expect } from "chai";
import { shallow } from "enzyme";
import React from "react";
import App from "../../src/Components/App";

describe("App component testing", function () {
	beforeEach(() => {
		this.renderedComponent = shallow(<App />);
	});

	it("should render", () => {
		expect(this.renderedComponent).to.have.lengthOf(1);
		const links = this.renderedComponent.find("Link");
		expect(links).to.have.lengthOf(2);
	});
});
