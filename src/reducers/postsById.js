import { types as actionTypes } from '../actions';

const addAllPosts = (state, action) => {
  return { ...action.payload };
};

const addOrUpdatePost = (state, action) => {
  const { id } = action.payload;
  return { ...state, [id]: { ...action.payload } };
};

const deletePost = (state, action) => {
  const { id } = action.payload;
  const newState = Object.keys(state).reduce((object, key) => {
    if (key !== id) {
      object[key] = state[key];
    }
    return object;
  }, {});
  return { ...newState };
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_POSTS:
      return addAllPosts(state, action);
    case actionTypes.GET_POST:
    case actionTypes.UPDATE_POST:
      return addOrUpdatePost(state, action);
    case actionTypes.DELETE_POST:
      return deletePost(state, action);
    default:
      return state;
  }
};

export default byId;
