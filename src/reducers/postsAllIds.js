import { types as actionTypes } from '../actions';

const allIds = (state = [], action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_POSTS:
      return [...Object.keys(action.payload)];
    case actionTypes.GET_POST:
      let newState = null;
      if (state.indexOf(action.payload.id) === -1)
        newState = [...state, action.payload.id];
      return newState ? newState : state;
    case actionTypes.DELETE_POST:
      return state.filter((id) => id !== action.payload.id);
    default:
      return state;
  }
};

export default allIds;
