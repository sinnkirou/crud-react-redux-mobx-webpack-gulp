import React, { Component } from "react";
import PropTypes from "prop-types";

class ViewablePost extends Component {
	
	render() {
		const post = this.props.post;
		return <div className="post" key={`viewablePost${post.id}`}>
			<h2 className="post_title">{post.title}</h2>
			<p className="post_message">{post.message}</p>
			<p className="post_id">{"id: " + post.id}</p>
			<div className="control-buttons">
				<button className="edit" onClick={() => this.props.editPost({
					id: post.id
				})}>
            Edit
				</button>
				<button className="delete" onClick={() => this.props.deletePost({
					id: post.id
				})}>
            Delete
				</button>
			</div>
		</div>;
	}
}

ViewablePost.propTypes = {
	post: PropTypes.object.isRequired,
	editPost: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired
};


export default ViewablePost;
