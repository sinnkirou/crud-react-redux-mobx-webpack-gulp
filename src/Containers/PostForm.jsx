import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost } from "../Actions";
import EditablePost from "../Components/EditablePost";
import PropTypes from "prop-types";

export class PostForm extends Component {
  
	render() {
		return (
			<div className="post-container" key="PostForm">
				<h1 className="post_heading">Create Post</h1>
				<EditablePost
					addPost={this.props.addPost}
					editing={false}
				/>
			</div>
		);
	}
}

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
	addPost: (payload) => dispatch(addPost(payload))
});

export default connect(null, mapDispatchToProps)(PostForm);
