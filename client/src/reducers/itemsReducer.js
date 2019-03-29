import { GET_ITEMS, ITEMS_LOADING } from '../actions/types';

const initialState = {
  items: [],
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
    default:
      return state;
  }
}
