import * as actionTypes from './actionTypes';
import * as categoriesActionCreators from './categoriesAction';
import * as postsActionCreators from './postsActions';
import * as commentsActionCreators from './commentsActions';

/* Export Action Types */
export const types = actionTypes;

/* Export Action Creators for modifying state.categories */
export const { getCategories } = categoriesActionCreators;

/* Export Action Creators for modifying state.posts */
export const {
  getAllPosts,
  getPost,
  addPost,
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
