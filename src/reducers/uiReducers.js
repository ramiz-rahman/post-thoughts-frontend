import { types as actionTypes } from '../actions';

/* 
SAMPLE STATE 
notification: {
    message: "Your post has been created",
    color: "success"
}
*/

const uiReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_NOTIFICATION:
      return { ...action.payload };
    case actionTypes.CLEAR_NOTIFICATION:
      return {};
    default:
      return state;
  }
};

export default uiReducer;
