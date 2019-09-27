import * as actionTypes from './actionTypes.js';
import * as API from '../utils/PostsAPI';

/* SYNC ACTION CREATORS (INTERNAL) */
const readAllCategoriesSuccess = (categories) => ({
  type: actionTypes.GET_CATEGORIES,
  payload: categories
});

/* ASYNC ACTION CREATORS (EXTERNAL) */
export const getCategories = () => {
  return async function(dispatch, getState) {
    let categories = getState().categories;
    if (!categories || categories.length === 0) {
      categories = await API.getCategories();
      dispatch(readAllCategoriesSuccess(categories));
    }
  };
};
