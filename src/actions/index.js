import * as actionTypes from './actionTypes';
import * as categoriesActionCreators from './categoriesAction';
import * as postsActionCreators from './postsActions';
import * as commentsActionCreators from './commentsActions';
import * as uiActionCreators from './uiActions';

/* Export Action Types */
export const types = actionTypes;

/* Export Action Creators for modifying state.categories */
export const { getCategories } = categoriesActionCreators;

/* Export Action Creators for modifying state.posts */
export const {
  getAllPosts,
  getPost,
  createPost,
  editPost,
  upVotePost,
  downVotePost,
  deletePost
} = postsActionCreators;

/* Export Action Creators for modifying state.comments */
export const {
  getPostComments,
  createComment,
  editComment,
  upVoteComment,
  downVoteComment,
  deleteComment
} = commentsActionCreators;

/* Export Action Creators for modifying UI */
export const { setNotification, clearNotification } = uiActionCreators;
