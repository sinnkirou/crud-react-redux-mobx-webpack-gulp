export const addPost = ({ ...data }) => ({
	type: 'ADD_POST',
	data: {
		editing: false,
		...data
	}
});

export const deletePost = ({ id }) => ({
	type: 'DELETE_POST',
	id,
});

export const editPost = ({ id }) => ({
	type: 'EDIT_POST',
	id
});

export const updatePost = ({ id, data }) => ({
	type: 'UPDATE_POST',
	id,
	data
});
