import { expect } from "chai";
import { shallow } from "enzyme";
import React from "react";
import App from "../../src/Components/App";

describe("App component testing", () => {
	let renderedComponent;
	
	beforeEach(() => {
		renderedComponent = shallow(<App history= {{}} />);
	});

	it("should render", () => {
		expect(renderedComponent).to.have.lengthOf(1);
		const links = renderedComponent.find("Link");
		expect(links).to.have.lengthOf(2);
	});
});
