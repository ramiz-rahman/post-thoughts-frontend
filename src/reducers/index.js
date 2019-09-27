import categoriesReducer from './categoriesReducer';
import postsReducer from './postsReducer';
import commentsReducer from './commentsReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  posts: postsReducer,
  comments: commentsReducer
});

export default rootReducer;
