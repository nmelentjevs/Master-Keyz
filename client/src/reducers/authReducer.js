import { SET_CURRENT_USER, CLEAR_CURRENT_PROFILE } from '../actions/types.js';
import isEmpty from '../validation/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload), // IF ACTION.PAYLOAD IS EMPTY MEANS TOKEN HAS NOT BEEN DECODED => FALSE
        user: action.payload
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
