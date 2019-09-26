import * as API from '../utils/PostsAPI';
import * as actionTypes from './actionTypes';
import uuidv5 from 'node-uuid';

/* SYNC ACTION CREATORS (INTERNAL) */

// Categories
const retrieveCategories = (categories) => ({
  type: actionTypes.GET_CATEGORIES,
  payload: categories
});

// Posts
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

// Comments
const readPostCommentsSuccess = (comments) => ({
  type: actionTypes.GET_POST_COMMENTS,
  payload: comments
});

const createCommentSuccess = (comment) => ({
  type: actionTypes.CREATE_COMMENT,
  payload: comment
});

const updateCommentSuccess = (comment) => ({
  type: actionTypes.UPDATE_COMMENT,
  payload: comment
});

const deleteCommentSuccess = (comment) => ({
  type: actionTypes.DELETE_COMMENT,
  payload: comment
});

/* ASYNC ACTION CREATORS */

// Categories
export const getCategories = () => {
  return async function(dispatch, getState) {
    let categories = getState().categories;
    if (!categories || categories.length === 0) {
      categories = await API.getCategories();
      dispatch(retrieveCategories(categories));
    }
  };
};

// Posts
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

export const deletePost = (id) => {
  return async function(dispatch) {
    const deletedPost = await API.deletePost(id);
    dispatch(removePost(deletedPost));
  };
};

// Comments
export const getPostComments = (postId) => {
  return async function(dispatch, getState) {
    let comments = getState().comments;
    if (!comments) {
      comments = await API.getPostComments(postId);
      dispatch(readPostCommentsSuccess(comments));
    }
  };
};

export const createComment = ({ author, body, postId }) => {
  return async function(dispatch) {
    let newComment = {
      id: uuidv5('ramiz'),
      parentId: postId,
      timestamp: Date.now(),
      author: author,
      body: body
    };
    newComment = await API.addCommentToPost(newComment);
    dispatch(createCommentSuccess(newComment));
  };
};

export const editComment = ({ id, body }) => {
  return async function(dispatch) {
    const timestamp = Date.now();
    const updatedComment = await API.editComment(id, timestamp, body);
    dispatch(updateCommentSuccess(updatedComment));
  };
};

export const upVoteComment = (id) => {
  return async function(dispatch) {
    const option = { option: 'upVote' };
    const updatedComment = await API.voteOnComment(id, option);
    dispatch(updateCommentSuccess(updatedComment));
  };
};

export const downVoteComment = (id) => {
  return async function(dispatch) {
    const option = { option: 'downVote' };
    const updatedComment = await API.voteOnComment(id, option);
    dispatch(updateCommentSuccess(updatedComment));
  };
};

export const deleteComment = (id) => {
  return async function(dispatch) {
    const deletedComment = await API.deleteComment(id);
    dispatch(deleteCommentSuccess(deletedComment));
  };
};

/* Export Action Types */
export const types = actionTypes;
