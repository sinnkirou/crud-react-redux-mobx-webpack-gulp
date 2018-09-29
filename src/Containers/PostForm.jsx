import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost as addPostAction } from '../Actions';
import EditablePost from '../Components/EditablePost';

export const PostForm = ({ addPost }) => (
  <div key="PostForm">
    <div className="navbar">
      <h2 className="center ">Post It</h2>
    </div>
    <div className="post_container" key="PostForm">
      <h1 className="post_heading">Create Post</h1>
      <EditablePost addPost={addPost} editing={false} />
    </div>
  </div>
);

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export const mapDispatchToProps = dispatch => ({
  addPost: payload => dispatch(addPostAction(payload))
});

export default connect(
  null,
  mapDispatchToProps
)(PostForm);
