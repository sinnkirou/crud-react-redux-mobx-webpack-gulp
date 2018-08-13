import React from "react";
import { connect } from "react-redux";
import { addPost } from "../Actions";
import EditablePost from "../Components/EditablePost";
import PropTypes from "prop-types";

export const PostForm = ({ addPost }) => (
	<div key="PostForm">
		<div className="navbar">
			<h2 className="center ">Post It</h2>
		</div>
		<div className="post-container" key="PostForm">
			<h1 className="post_heading">Create Post</h1>
			<EditablePost
				addPost={addPost}
				editing={false}
			/>
		</div>
	</div>
);

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired
};

export const mapDispatchToProps = dispatch => ({
	addPost: (payload) => dispatch(addPost(payload))
});

export default connect(null, mapDispatchToProps)(PostForm);
