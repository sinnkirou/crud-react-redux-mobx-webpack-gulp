import { expect } from "chai";
import postReducer from "../../src/Reducers/postReducer";
import _ from "lodash";

describe("Reducers testing", () => {
	const defaultState = [{
		editing: false,
		message: "message",
		title: "title",
		id: 1
	}];
	const defaultAction = {
		type: "ADD_POST"
	};

	it("when default", () => {
		expect(postReducer([], {})).to.have.lengthOf(0);
	});

	it("can handle addPost", () => {
		const state = _.cloneDeep(defaultState);
		const action = _.cloneDeep(defaultAction);
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
		const state = _.cloneDeep(defaultState);
		const action = _.cloneDeep(defaultAction);
		action.type = "DELETE_POST";
		action.id = 1;
		expect(JSON.stringify(postReducer(state, action))).to.equal(
			JSON.stringify([])
		);
	});

	it("can handle editPost when id matched", () => {
		const state = _.cloneDeep(defaultState);
		const action = _.cloneDeep(defaultAction);
		action.type = "EDIT_POST";
		action.id = 1;
		expect(JSON.stringify(postReducer(state, action))).to.equal(
			JSON.stringify([
				{
					editing: true,
					message: "message",
					title: "title",
					id: 1
				}
			])
		);
	});

	it("can handle editPost when id not match", () => {
		const state = _.cloneDeep(defaultState);
		const action = _.cloneDeep(defaultAction);
		action.type = "EDIT_POST";
		action.id = 2;
		expect(JSON.stringify(postReducer(state, action))).to.equal(
			JSON.stringify(state)
		);
	});

	it("can handle updatePost when id matched", () => {
		const state = _.cloneDeep(defaultState);
		const action = _.cloneDeep(defaultAction);
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

	it("can handle updatePost when id not match", () => {
		const state = _.cloneDeep(defaultState);
		const action = _.cloneDeep(defaultAction);
		action.type = "UPDATE_POST";
		action.id = 2;
		action.data = {
			message: "newmessage",
			title: "newtitle",
		};
		expect(JSON.stringify(postReducer(state, action))).to.equal(
			JSON.stringify(state)
		);
	});
});
