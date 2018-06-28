const postReducer = (state = [], action) => {
	switch (action.type) {
	case 'ADD_POST':
		return state.concat([{...action.data, id: state.length+1}]);
	case 'DELETE_POST':
		return state.filter(post => post.id !== action.id);
	case 'EDIT_POST':
		return state.map(
			post =>
				post.id === action.id ? { ...post, editing: !post.editing } : post
		);
	case 'UPDATE_POST':
		return state.map(post => {
			if (post.id === action.id) {
				return {
					...post,
					title: action.data.title,
					message: action.data.message,
					editing: !post.editing
				};
			} else return post;
		});
	default:
		return state;
	}
};
export default postReducer;
