/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ViewablePost from '../Components/ViewablePost';
import EditablePost from '../Components/EditablePost';
import {
  deletePost as deletePostAction,
  editPost as editPostAction,
  updatePost as updatePostAction
} from '../Actions';

class AllPosts extends Component {
  constructor(props) {
    super(props);
    this.state = { keyword: '' };
  }

  getPosts = () => {
    const allPosts = [];
    const { posts, updatePost, deletePost, editPost } = this.props;
    const { keyword } = this.state;
    posts.forEach(post => {
      const regex = new RegExp(keyword, 'i');
      if (!keyword || regex.test(post.title)) {
        allPosts.push(
          <div key={post.title}>
            {post.editing ? (
              <EditablePost post={post} updatePost={updatePost} editing />
            ) : (
              <ViewablePost post={post} deletePost={deletePost} editPost={editPost} />
            )}
          </div>
        );
      }
    }, this);
    return allPosts;
  };

  onChangeHandle = e => {
    e.preventDefault();
    this.setState({ keyword: e.target.value });
  };

  render() {
    const { posts } = this.props;
    const { keyword } = this.state;
    return (
      <div key="AllPosts">
        {posts && posts.length > 0 ? (
          <div className="allPosts">
            <h1 className="post_heading">All Posts</h1>
            <div className="mdl-textfield mdl-js-textfield ">
              <label className="mdl-button mdl-js-button mdl-button--icon">
                <i className="material-icons">search</i>
              </label>
              <input
                className="mdl-textfield__input"
                type="text"
                required
                placeholder="Enter post title to search"
                value={keyword}
                onChange={this.onChangeHandle}
              />
            </div>
          </div>
        ) : (
          <div className="navbar">
            <h2 className="center ">Please create a post first</h2>
          </div>
        )}
        <br />
        {this.getPosts()}
      </div>
    );
  }
}

AllPosts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  editPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.postReducer
});

const mapDispatchToProps = dispatch => ({
  editPost: payload => dispatch(editPostAction(payload)),
  deletePost: payload => dispatch(deletePostAction(payload)),
  updatePost: payload => dispatch(updatePostAction(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPosts);
