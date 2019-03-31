import { GET_ITEMS, ITEMS_LOADING, GET_USER_ITEMS } from '../actions/types';

const initialState = {
  items: [],
  purchased: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case GET_USER_ITEMS:
      return {
        ...state,
        purchased: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
