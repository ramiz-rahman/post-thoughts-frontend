import * as actionTypes from './actionTypes.js';

/* SYNC ACTION CREATORS (INTERNAL) */
export const setNotification = (message, color) => ({
  type: actionTypes.SET_NOTIFICATION,
  payload: {
    message: message,
    color: color
  }
});

export const clearNotification = () => ({
  type: actionTypes.CLEAR_NOTIFICATION
});

export const setPostsLoading = () => ({
  type: actionTypes.SET_POSTS_LOADING
});

export const unsetPostsLoading = () => ({
  type: actionTypes.UNSET_POSTS_LOADING
});

export const setCommentsLoading = () => ({
  type: actionTypes.SET_COMMENTS_LOADING
});

export const unsetCommentsLoading = () => ({
  type: actionTypes.UNSET_COMMENTS_LOADING
});
