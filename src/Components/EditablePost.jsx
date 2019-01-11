import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class EditablePost extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const title = this.getTitle.value;
    const message = this.getMessage.value;
    const data = {
      title,
      message
    };
    const { editing, post, updatePost, addPost } = this.props;
    if (editing) {
      updatePost({ id: post.id, data });
    } else {
      addPost({
        ...data
      });
      this.getTitle.value = '';
      this.getMessage.value = '';
    }
  };

  render() {
    const { post, editing } = this.props;

    return (
      <div key={`editablePost${_.isEmpty(post) ? 'default' : post.id}`} className="post">
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            required
            type="text"
            ref={input => {
              this.getTitle = input;
            }}
            defaultValue={_.isEmpty(post) ? post.title : ''}
            placeholder="Enter Post Title"
          />
          <br />
          <br />
          <textarea
            required
            rows="5"
            ref={input => {
              this.getMessage = input;
            }}
            defaultValue={_.isEmpty(post) ? post.message : ''}
            cols="28"
            placeholder="Enter Post"
          />
          <br />
          <br />
          <button className="mdl-button mdl-js-button mdl-button--raised" type="submit">
            {editing ? 'Update' : 'Submit'}
          </button>
        </form>
      </div>
    );
  }
}

EditablePost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    editing: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string
  }),
  editing: PropTypes.bool.isRequired,
  updatePost: PropTypes.func,
  addPost: PropTypes.func
};

EditablePost.defaultProps = {
  post: {},
  updatePost: () => {},
  addPost: () => {}
};

export default EditablePost;
