import { types as actionTypes } from '../actions';

// SAMPLE OF STATE SLICE
/* 
const postsById = {
  '8xf0y6ziyjabvozdd253nd': {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  '6ni6ok3ym7mf1p33lnez': {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body:
      'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0
  }
}; */

const addAllPosts = (state, action) => {
  return { ...action.payload };
};

const addPost = (state, action) => {
  const { payload } = action;
  const { id } = payload;
  const newPost = { [id]: payload };
  return { ...state, ...newPost };
};

const updatePost = (state, action) => {
  const { payload } = action;
  const { id } = payload;
  const post = state[id];
  return { ...state, [post.id]: { ...payload } };
};

const deletePost = (state, action) => {
  const { payload } = action;
  const { id } = payload;
  const newState = Object.keys(state).reduce((object, key) => {
    if (key !== id) {
      object[key] = state[key];
    }
    return object;
  }, {});
  return { ...newState };
};

const postsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_POSTS:
      return addAllPosts(state, action);
    case actionTypes.GET_POST:
      return addPost(state, action);
    case actionTypes.UPDATE_POST:
      return updatePost(state, action);
    case actionTypes.DELETE_POST:
      return deletePost(state, action);
    default:
      return state;
  }
};

export default postsReducer;
