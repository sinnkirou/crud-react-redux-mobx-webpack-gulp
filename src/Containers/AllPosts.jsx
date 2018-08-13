import React, { Component } from "react";
import { connect } from "react-redux";
import ViewablePost from "../Components/ViewablePost";
import EditablePost from "../Components/EditablePost";
import { deletePost, editPost, updatePost } from "../Actions";
import PropTypes from "prop-types";

class AllPosts extends Component {
	constructor(props) {
		super(props);
		this.state = { id: "" };
	}

	getPosts = () => {
		var posts = [];
		this.props.posts.forEach(post => {
			if (!this.state.id || (this.state.id && post.id === Number(this.state.id))) {
				posts.push(
					<div key={post.id}>
						{post.editing ? (
							<EditablePost
								post={post}
								updatePost={this.props.updatePost}
								editing={true}
							/>
						) : (
							<ViewablePost
								post={post}
								deletePost={this.props.deletePost}
								editPost={this.props.editPost}
							/>
						)}
					</div>
				);
			}
		}, this);
		return posts;
	}

	onChangeHandle = (e) => {
		e.preventDefault();
		this.setState({ id: e.target.value });
	}

	render() {
		return (
			<div key="AllPosts">
				{this.props.posts && this.props.posts.length > 0 ? (
					<div className="allPosts">
						<h1 className="post_heading">All Posts</h1>
						<input
							required
							type="text"
							placeholder="Enter post ID to search"
							value={this.state.id}
							onChange={this.onChangeHandle}
						/>
					</div>
				) : (
					<div className="navbar">
						<h1 className="post_heading">Please create a post first</h1>
					</div>
				)}
				<br/>
				{this.getPosts()}
			</div>
		);
	}
}

AllPosts.propTypes = {
	posts: PropTypes.array.isRequired,
	editPost: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
	updatePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	posts: state.postReducer
});

const mapDispatchToProps = dispatch => ({
	editPost: payload => dispatch(editPost(payload)),
	deletePost: payload => dispatch(deletePost(payload)),
	updatePost: payload => dispatch(updatePost(payload))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AllPosts);
