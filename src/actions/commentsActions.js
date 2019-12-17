import * as actionTypes from './actionTypes.js';
import {
  setNotification,
  setCommentsLoading,
  unsetCommentsLoading
} from './uiActions';
import * as API from '../utils/PostsAPI';
import uuidv5 from 'node-uuid';

import { getPost } from './postsActions';

/* SYNC ACTION CREATORS (INTERNAL) */

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

/* ASYNC ACTION CREATORS (EXTERNAL) */

export const getPostComments = (postId) => {
  return async function(dispatch) {
    dispatch(setCommentsLoading());

    const comments = await API.getPostComments(postId);
    const commentsById = comments.reduce((commentsById, comment) => {
      commentsById[comment.id] = comment;
      return commentsById;
    }, {});

    dispatch(unsetCommentsLoading());
    dispatch(readPostCommentsSuccess(commentsById));
  };
};

export const createComment = ({ author, body, postId }) => {
  return async function(dispatch) {
    dispatch(setCommentsLoading());

    let newComment = {
      id: uuidv5('ramiz'),
      parentId: postId,
      timestamp: Date.now(),
      author: author,
      body: body
    };
    newComment = await API.addCommentToPost(newComment);

    dispatch(unsetCommentsLoading());
    dispatch(createCommentSuccess(newComment));
    dispatch(
      setNotification(
        `Comment has been created by ${author}`,
        'success'
      )
    );
    dispatch(getPost(postId));
  };
};

export const editComment = ({ id, body }) => {
  return async function(dispatch) {
    const timestamp = Date.now();
    const updatedComment = await API.editComment(id, timestamp, body);
    dispatch(updateCommentSuccess(updatedComment));
    dispatch(
      setNotification(
        `Comment has been updated by ${updatedComment.author}`,
        'warning'
      )
    );
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
    dispatch(getPost(deletedComment.parentId));
    dispatch(
      setNotification(
        `${deletedComment.author}'s comment has been deleted.`,
        'danger'
      )
    );
  };
};
