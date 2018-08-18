import { expect } from "chai";
import { shallow } from "enzyme";
import React from "react";
import Loading from "../../src/Components/Loading";

describe("Loading component", function () {
	it("should render", () => {
		this.renderedComponent = shallow(<Loading />);
		expect(this.renderedComponent).to.have.lengthOf(1);
		const spinner = this.renderedComponent.find(".mdl-spinner");
		expect(spinner).to.have.lengthOf(1);
	});
});