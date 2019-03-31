import {
  ADD_TO_BASKET,
  DELETE_FROM_BASKET,
  CLEAR_CART
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
        basket: [...state.basket, action.payload.item],
        total: (
          parseFloat(state.total) + parseFloat(action.payload.price)
        ).toFixed(2)
      };
    case DELETE_FROM_BASKET:
      return {
        ...state,
        basket: state.basket.filter(items => items.id !== action.payload.id),
        total: (
          parseFloat(state.total) - parseFloat(action.payload.price)
        ).toFixed(2)
      };
    case CLEAR_CART:
      return {
        ...state,
        basket: [],
        total: 0.0
      };
    default:
      return state;
  }
}
