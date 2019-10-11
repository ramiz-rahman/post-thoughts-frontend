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
