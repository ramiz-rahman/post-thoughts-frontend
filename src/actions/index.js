import * as API from '../utils/PostsAPI';
import * as actionTypes from './actionTypes';
import uuidv5 from 'node-uuid';

export const types = actionTypes;

// Sync ActionCreators
const retrievePosts = (posts) => ({
  type: actionTypes.GET_ALL_POSTS,
  payload: posts
});

const retrievePost = (post) => ({
  type: actionTypes.GET_POST,
  payload: post
});

const updatePost = (post) => ({
  type: actionTypes.EDIT_POST,
  payload: post
});

const removePost = (post) => ({
  type: actionTypes.DELETE_POST,
  payload: post
});

const retrieveCategories = (categories) => ({
  type: actionTypes.GET_CATEGORIES,
  payload: categories
});

// Async ActionCreators
export const getAllPosts = () => {
  return async function(dispatch) {
    const posts = await API.getAllPosts();
    const postsById = posts.reduce((postsById, post) => {
      postsById[post.id] = post;
      return postsById;
    }, {});

    return dispatch(retrievePosts(postsById));
  };
};

export const getPost = (id) => {
  return async function(dispatch, getState) {
    const posts = getState().posts;
    if (!Object.keys(posts).includes(id)) {
      const post = await API.getPost(id);
      return dispatch(retrievePost(post));
    } else {
      return null;
    }
  };
};

export const addPost = ({ category, author, title, body }) => {
  return async function(dispatch) {
    const post = {
      category,
      author,
      title,
      body,
      timestamp: Date.now(),
      id: uuidv5('ramiz')
    };
    const createdPost = await API.createPost(post);
    dispatch(retrievePost(createdPost));
  };
};

export const editPost = ({ id, title, body }) => {
  return async function(dispatch) {
    const updatedPost = await API.updatePost(id, title, body);
    dispatch(updatePost(updatedPost));
  };
};

export const deletePost = (id) => {
  return async function(dispatch) {
    const deletedPost = await API.deletePost(id);
    dispatch(removePost(deletedPost));
  };
};

export const upVotePost = (id) => {
  return async function(dispatch) {
    const option = { option: 'upVote' };
    const updatedPost = await API.voteOnPost(id, option);
    dispatch(updatePost(updatedPost));
  };
};

export const downVotePost = (id) => {
  return async function(dispatch) {
    const option = { option: 'downVote' };
    const updatedPost = await API.voteOnPost(id, option);
    dispatch(updatePost(updatedPost));
  };
};

export const getCategories = () => {
  return async function(dispatch, getState) {
    let categories = getState().categories;
    if (!categories || categories.length === 0) {
      categories = await API.getCategories();
      dispatch(retrieveCategories(categories));
    }
  };
};

// Synchronous Action Types and Action Creators
export const FETCH_POSTS_BEGIN = 'FETCH_POSTS_BEGIN';
export const fetchPostsBegin = () => ({
  type: FETCH_POSTS_BEGIN
});

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: { posts }
});

export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const fetchPostsFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
  error: true
});

export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const fetchPostSuccess = (post) => ({
  type: FETCH_POST_SUCCESS,
  payload: post
});
