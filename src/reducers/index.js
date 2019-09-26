import categoriesReducer from './categoriesReducer';
import postsReducer from './postsReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  posts: postsReducer
});

export default rootReducer;
