import {
  ADD_TO_BASKET,
  DELETE_FROM_BASKET,
  PLUS_TOTAL,
  MINUS_TOTAL
} from '../actions/types';

const initialState = {
  basket: [],
  total: 0.0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_BASKET:
      return {
        ...state,
        basket: [...state.basket, action.payload]
      };
    case DELETE_FROM_BASKET:
      return {
        ...state,
        basket: state.basket.filter(items => items.id !== action.payload)
      };
    case PLUS_TOTAL:
      return {
        ...state,
        total: (parseFloat(state.total) + parseFloat(action.payload)).toFixed(2)
      };
    case MINUS_TOTAL:
      return {
        ...state,
        total: (parseFloat(state.total) - parseFloat(action.payload)).toFixed(2)
      };
    default:
      return state;
  }
}
