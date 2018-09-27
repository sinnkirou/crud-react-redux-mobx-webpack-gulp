import { addPost, deletePost, updatePost, editPost } from "../../src/Actions";
import { expect } from "chai";

describe("actions testing", () => {
	it("can call addPost", () => {
		expect(
			JSON.stringify(addPost({ message: "message", title: "title" }))
		).to.equal(
			JSON.stringify({
				type: "ADD_POST",
				data: {
					editing: false,
					message: "message",
					title: "title"
				}
			})
		);
	});

	it("can call deletePost", () => {
		expect(JSON.stringify(deletePost({ id: 1 }))).to.equal(
			JSON.stringify({
				type: "DELETE_POST",
				id: 1
			})
		);
	});

	it("can call updatePost", () => {
		expect(
			JSON.stringify(
				updatePost({ id: 1, data: { message: "message", title: "title" } })
			)
		).to.equal(
			JSON.stringify({
				type: "UPDATE_POST",
				id: 1,
				data: {
					message: "message",
					title: "title"
				}
			})
		);
	});

	it("can call editPost", () => {
		expect(JSON.stringify(editPost({ id: 1 }))).to.equal(
			JSON.stringify({
				type: "EDIT_POST",
				id: 1
			})
		);
	});
});
