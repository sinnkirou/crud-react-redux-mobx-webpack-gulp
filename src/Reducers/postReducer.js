import uuid from 'uuid/v1';
import actionTypes from '../Constants/actionTypes';

const postReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_POST:
      return state.concat([{ ...action.data, id: uuid() }]);
    case actionTypes.DELETE_POST:
      return state.filter(post => post.id !== action.id);
    case actionTypes.EDIT_POST:
      return state.map(post =>
        post.id === action.id ? { ...post, editing: !post.editing } : post
      );
    case actionTypes.UPDATE_POST:
      return state.map(post => {
        if (post.id === action.id) {
          return {
            ...post,
            ...action.data,
            editing: !post.editing
          };
        }
        return post;
      });
    case actionTypes.SET_POSTS:
      return action.data;
    default:
      return state;
  }
};
export default postReducer;
