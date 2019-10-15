import * as actionTypes from './actionTypes.js';
import {
  setNotification,
  setPostsLoading,
  unsetPostsLoading
} from './uiActions';
import * as API from '../utils/PostsAPI';
import uuidv5 from 'node-uuid';

/* SYNC ACTION CREATORS (INTERNAL) */
const readAllPostsSuccess = (posts) => ({
  type: actionTypes.GET_ALL_POSTS,
  payload: posts
});

const readPostSuccess = (post) => ({
  type: actionTypes.GET_POST,
  payload: post
});

const updatePostSuccess = (post) => ({
  type: actionTypes.UPDATE_POST,
  payload: post
});

const deletePostSuccess = (post) => ({
  type: actionTypes.DELETE_POST,
  payload: post
});

/* ASYNC ACTION CREATORS (EXTERNAL) */
export const getAllPosts = () => {
  return async function(dispatch) {
    dispatch(setPostsLoading());

    const posts = await API.getAllPosts();
    const postsById = posts.reduce((postsById, post) => {
      postsById[post.id] = post;
      return postsById;
    }, {});

    dispatch(unsetPostsLoading());
    return dispatch(readAllPostsSuccess(postsById));
  };
};

export const getPost = (id) => {
  return async function(dispatch, getState) {
    const post = await API.getPost(id);
    return dispatch(readPostSuccess(post));
  };
};

export const createPost = ({ category, author, title, body }) => {
  return async function(dispatch) {
    dispatch(setPostsLoading());

    const post = {
      category,
      author,
      title,
      body,
      timestamp: Date.now(),
      id: uuidv5('ramiz')
    };
    const createdPost = await API.createPost(post);

    dispatch(unsetPostsLoading());
    dispatch(readPostSuccess(createdPost));
    dispatch(
      setNotification(`Post has been created by ${author}`, 'success')
    );
  };
};

export const editPost = ({ id, title, body }) => {
  return async function(dispatch) {
    dispatch(setPostsLoading());

    const updatedPost = await API.updatePost(id, title, body);

    dispatch(unsetPostsLoading());
    dispatch(updatePostSuccess(updatedPost));
    dispatch(
      setNotification(
        `Post has been updated by ${updatedPost.author}`,
        'warning'
      )
    );
  };
};

export const upVotePost = (id) => {
  return async function(dispatch) {
    const option = { option: 'upVote' };
    const updatedPost = await API.voteOnPost(id, option);
    dispatch(updatePostSuccess(updatedPost));
  };
};

export const downVotePost = (id) => {
  return async function(dispatch) {
    const option = { option: 'downVote' };
    const updatedPost = await API.voteOnPost(id, option);
    dispatch(updatePostSuccess(updatedPost));
  };
};

export const deletePost = (id) => {
  return async function(dispatch) {
    dispatch(setPostsLoading());

    const deletedPost = await API.deletePost(id);

    dispatch(unsetPostsLoading());
    dispatch(deletePostSuccess(deletedPost));
    dispatch(
      setNotification(
        `Post has been deleted by ${deletedPost.author}`,
        'danger'
      )
    );
  };
};
