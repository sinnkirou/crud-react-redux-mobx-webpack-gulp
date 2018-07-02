import { expect } from "chai";
import postReducer from "../../src/Reducers/postReducer";
import _ from "lodash";

describe("Reducers testing", function () {
	beforeEach(() => {
		this.state = [{
			editing: false,
			message: "message",
			title: "title",
			id: 1
		}];
		this.action = {
			type: "ADD_POST"
		};
	});

	it("can handle addPost", () => {
		const state = _.cloneDeep(this.state);
		const action = _.cloneDeep(this.action);
		action.type = "ADD_POST";
		action.data = {
			editing: false,
			message: "newmessage",
			title: "newtitle"
		};
		expect(JSON.stringify(postReducer(state, action))).to.equal(
			JSON.stringify([
				{
					...state[0]
				},
				{
					...action.data,
					id: 2
				}
			])
		);
	});

	it("can handle deletePost", () => {
		const state = _.cloneDeep(this.state);
		const action = _.cloneDeep(this.action);
		action.type = "DELETE_POST";
		action.id = 1;
		expect(JSON.stringify(postReducer(state, action))).to.equal(
			JSON.stringify([])
		);
	});

	it("can handle editPost", () => {
		const state = _.cloneDeep(this.state);
		const action = _.cloneDeep(this.action);
		action.type = "EDIT_POST";
		expect(JSON.stringify(postReducer(state, action))).to.equal(
			JSON.stringify([
				{
					editing: true,
					...state[0]
				}
			])
		);
	});

	it("can handle updatePost", () => {
		const state = _.cloneDeep(this.state);
		const action = _.cloneDeep(this.action);
		action.type = "UPDATE_POST";
		action.id = 1;
		action.data = {
			message: "newmessage",
			title: "newtitle",
		};
		expect(JSON.stringify(postReducer(state, action))).to.equal(
			JSON.stringify([
				{
					editing: true,
					message: "newmessage",
					title: "newtitle",
					id: 1
				}
			])
		);
	});
});
