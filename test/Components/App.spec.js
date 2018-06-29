import { expect } from "chai";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import App from "../../src/Components/App";

describe("App component testing", function () {
	beforeEach(() => {
		configure({ adapter: new Adapter() });
		this.renderedComponent = shallow(<App />);
	});

	it("should render", () => {
		expect(this.renderedComponent).to.have.lengthOf(1);
		const postItTitle = this.renderedComponent.find("h2.center");
		expect(postItTitle).to.have.lengthOf(1);
	});
});
