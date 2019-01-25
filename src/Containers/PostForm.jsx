import React from 'react';
import EditablePost from '../Components/EditablePost';

export const PostForm = () => (
  <div key="PostForm">
    <div className="navbar">
      <h2 className="center ">Post It</h2>
    </div>
    <div className="post_container" key="PostForm">
      <h1 className="post_heading">Create Post</h1>
      <EditablePost editing={false} />
    </div>
  </div>
);

export default PostForm;
