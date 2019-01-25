import uuid from 'uuid/v1';
import { decorate, observable, action, computed } from 'mobx';
import postService from '../Apis/postService';

class Store {
  posts = [];

  addPost(payload) {
    this.posts = this.posts.concat([{ ...payload, id: uuid() }]);
  }

  deletePost(payload) {
    this.posts = this.posts.filter(post => post.id !== payload.id);
  }

  editPost(payload) {
    this.posts = this.posts.map(post =>
      post.id === payload.id ? { ...post, editing: !post.editing } : post
    );
  }

  updatePost(payload) {
    this.posts = this.posts.map(post => {
      if (post.id === payload.id) {
        return {
          ...post,
          ...payload.data,
          editing: !post.editing
        };
      }
      return post;
    });
  }

  setPosts(payload) {
    this.posts = payload;
  }

  initPosts() {
    postService.getPosts(posts => this.setPosts(posts));
  }

  get postsCount() {
    return this.posts.length;
  }
}

decorate(Store, {
  posts: observable,
  editPost: action,
  deletePost: action,
  updatePost: action,
  setPosts: action,
  postsCount: computed
});

const postStore = new Store();
export default postStore;
