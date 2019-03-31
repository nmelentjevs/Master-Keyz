import {
  PAYMENT_ACCEPTED,
  PAYMENT_CANCELLED,
  PAYMENT_ERROR,
  BUTTON_LOADING,
  RESET
} from '../actions/types.js';

const initialState = {
  paid: false,
  errors: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PAYMENT_ACCEPTED:
      return {
        ...state,
        paid: true,
        loading: false
      };
    case PAYMENT_CANCELLED:
      return {
        ...state,
        paid: false,
        loading: false
      };
    case PAYMENT_ERROR:
      return {
        ...state,
        errors: action.payload,
        loading: false
      };
    case BUTTON_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case RESET:
      return {
        ...state,
        paid: false
      };
    default:
      return state;
  }
}
