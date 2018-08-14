import React, { Component } from "react";
import PropTypes from "prop-types";

class EditablePost extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		const title = this.getTitle.value;
		const message = this.getMessage.value;
		const data = {
			title,
			message
		};
		if (this.props.editing) {
			this.props.updatePost({ id: this.props.post.id, data });
		} else {
			this.props.addPost({
				...data
			});
			this.getTitle.value = "";
			this.getMessage.value = "";
		}
	}

	render() {
		const post = this.props.post;

		return (
			<div key={`editablePost${post ? post.id: "default"}`} className="post">
				<form className="form" onSubmit={this.handleSubmit}>
					<input
						required
						type="text"
						ref={input => (this.getTitle = input)}
						defaultValue={post ? post.title : ""}
						placeholder="Enter Post Title"
					/>
					<br />
					<br />
					<textarea
						required
						rows="5"
						ref={input => (this.getMessage = input)}
						defaultValue={post ? post.message : ""}
						cols="28"
						placeholder="Enter Post"
					/>
					<br />
					<br />
					<button className="mdl-button mdl-js-button mdl-button--raised">
						{this.props.editing ? "Update" : "Submit"}
					</button>
				</form>
			</div>
		);
	}
}

EditablePost.propTypes = {
	post: PropTypes.object,
	editing: PropTypes.bool.isRequired,
	updatePost: PropTypes.func,
	addPost: PropTypes.func
};

export default EditablePost;
