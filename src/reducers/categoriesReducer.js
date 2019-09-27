import { types as actionTypes } from '../actions';

// SAMPLE OF STATE SLICE
/* 
const defaultCategories = [
  {
    name: 'react',
    path: 'react'
  },
  {
    name: 'redux',
    path: 'redux'
  },
  {
    name: 'udacity',
    path: 'udacity'
  }
]; */

const categoriesReducer = (state = [], action) => {
  if (action.type === actionTypes.GET_CATEGORIES) {
    return [...action.payload];
  }
  return state;
};

export default categoriesReducer;
