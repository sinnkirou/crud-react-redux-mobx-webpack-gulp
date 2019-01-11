import uuid from 'uuid/v1';

const postReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_POST':
      return state.concat([{ ...action.data, id: uuid() }]);
    case 'DELETE_POST':
      return state.filter(post => post.id !== action.id);
    case 'EDIT_POST':
      return state.map(post =>
        post.id === action.id ? { ...post, editing: !post.editing } : post
      );
    case 'UPDATE_POST':
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
    default:
      return state;
  }
};
export default postReducer;
