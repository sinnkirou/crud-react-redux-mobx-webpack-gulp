import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Post extends Component {
	render() {
		return <div className="post">
			<h2 className="post_title">{this.props.post.title}</h2>
			<p className="post_message">{this.props.post.message}</p>
			<p className="post_id">{'id: ' + this.props.post.id}</p>
			<div className="control-buttons">
				<button className="edit" onClick={() => this.props.editPost({
					id: this.props.post.id
				})}>
            Edit
				</button>
				<button className="delete" onClick={() => this.props.deletePost({
					id: this.props.post.id
				})}>
            Delete
				</button>
			</div>
		</div>;
	}
}

Post.propTypes = {
	post: PropTypes.element.isRequired,
	editPost: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired
};


export default Post;
