import { types as actionTypes } from '../actions';

// SAMPLE OF STATE SLICE
/* 
const defaultComments = {
  '894tuq4ut84ut8v4t8wun89g': {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  '8tu4bsun805n8un48ve89': {
    id: '8tu4bsun805n8un48ve89',
    parentId: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  }
}; */

const addComments = (state, action) => {
  return { ...state, ...action.payload };
};

const addComment = (state, action) => {
  const { id } = action.payload;
  const newComment = { [id]: action.payload };
  return { ...state, ...newComment };
};

const updateComment = (state, action) => {
  const { id } = action.payload;
  const newState = { ...state, [id]: { ...action.payload } };
  return newState;
};

const deleteComment = (state, action) => {
  const { id } = action.payload;
  const newState = Object.keys(state).reduce((reducedState, key) => {
    if (key !== id) {
      reducedState[key] = state[key];
    }
    return reducedState;
  }, {});
  return { ...newState };
};

const commentsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_POST_COMMENTS:
      return addComments(state, action);
    case actionTypes.CREATE_COMMENT:
      return addComment(state, action);
    case actionTypes.UPDATE_COMMENT:
      return updateComment(state, action);
    case actionTypes.DELETE_COMMENT:
      return deleteComment(state, action);
    default:
      return state;
  }
};

export default commentsReducer;
