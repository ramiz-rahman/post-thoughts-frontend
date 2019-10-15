import categoriesReducer from './categoriesReducer';
import postsReducer, * as fromPosts from './postsReducer';
import commentsReducer from './commentsReducer';
import uiReducer from './uiReducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  posts: postsReducer,
  comments: commentsReducer,
  ui: uiReducer
});

export default rootReducer;
export const getFilteredPostList = (state, filter) =>
  fromPosts.getFilteredPostList(state.posts, filter);
