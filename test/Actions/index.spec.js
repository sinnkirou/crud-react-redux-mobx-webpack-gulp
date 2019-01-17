import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import {
  addPost,
  deletePost,
  updatePost,
  editPost,
  setPosts,
  getInitPosts
} from '../../src/Actions';
import actionTypes from '../../src/Constants/actionTypes';
import postService from '../../src/Apis/postService';

describe('actions testing', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('can call addPost', () => {
    expect(JSON.stringify(addPost({ message: 'message', title: 'title' }))).to.equal(
      JSON.stringify({
        type: actionTypes.ADD_POST,
        data: {
          editing: false,
          message: 'message',
          title: 'title'
        }
      })
    );
  });

  it('can call deletePost', () => {
    expect(JSON.stringify(deletePost({ id: 1 }))).to.equal(
      JSON.stringify({
        type: actionTypes.DELETE_POST,
        id: 1
      })
    );
  });

  it('can call updatePost', () => {
    expect(
      JSON.stringify(updatePost({ id: 1, data: { message: 'message', title: 'title' } }))
    ).to.equal(
      JSON.stringify({
        type: actionTypes.UPDATE_POST,
        id: 1,
        data: {
          message: 'message',
          title: 'title'
        }
      })
    );
  });

  it('can call editPost', () => {
    expect(JSON.stringify(editPost({ id: 1 }))).to.equal(
      JSON.stringify({
        type: actionTypes.EDIT_POST,
        id: 1
      })
    );
  });

  it('can call set posts', () => {
    const posts = [
      {
        id: '1'
      },
      {
        id: '2'
      }
    ];
    expect(JSON.stringify(setPosts({ posts }))).to.equal(
      JSON.stringify({
        type: actionTypes.SET_POSTS,
        data: posts
      })
    );
  });

  it('can call getInitPosts', () => {
    let triggered = false;
    sandbox.stub(postService, 'getPosts').callsFake(() => {
      triggered = true;
    });
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const store = mockStore({ postReducer: [] });
    store.dispatch(getInitPosts());
    expect(triggered).to.equal(true);
  });
});
