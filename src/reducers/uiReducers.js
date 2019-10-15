import { types as actionTypes } from '../actions';

/* 
SAMPLE STATE 
commentsLoading: false, 
postsLoading: false,
notification: {
    message: "Your post has been created",
    color: "success"
}
*/

const uiReducer = (
  state = {
    commentsLoading: false,
    postsLoading: false,
    notification: {}
  },
  action
) => {
  switch (action.type) {
    case actionTypes.SET_NOTIFICATION:
      return { ...state, notification: { ...action.payload } };
    case actionTypes.CLEAR_NOTIFICATION:
      return { ...state, notification: {} };
    case actionTypes.SET_POSTS_LOADING:
      return { ...state, postsLoading: true };
    case actionTypes.UNSET_POSTS_LOADING:
      return { ...state, postsLoading: false };
    case actionTypes.SET_COMMENTS_LOADING:
      return { ...state, commentsLoading: true };
    case actionTypes.UNSET_COMMENTS_LOADING:
      return { ...state, commentsLoading: false };
    default:
      return state;
  }
};

export default uiReducer;
