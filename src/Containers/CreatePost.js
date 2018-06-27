import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../Actions';
import EditPanel from '../Components/EditPanel';

class CreatePost extends Component {
  
  render() {
    return (
      <div className="post-container">
        <h1 className="post_heading">Create Post</h1>
        <EditPanel
          key="post-form"
          addPost={this.props.addPost}
          editing={false}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addPost: (payload) => dispatch(addPost(payload))
})

export default connect(null, mapDispatchToProps)(CreatePost);