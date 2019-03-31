import {
  DELETE_FROM_BASKET,
  ADD_TO_BASKET,
  GET_ERRORS,
  ITEMS_LOADING,
  CLEAR_CART,
  RESET
} from './types';

export const addItem = item => dispatch => {
  dispatch({
    type: ADD_TO_BASKET,
    payload: { item, price: item.price }
  });
  dispatch({
    type: RESET
  });
};

export const deleteItem = (id, price) => dispatch => {
  dispatch({
    type: DELETE_FROM_BASKET,
    payload: { id, price }
  });
};

export const editCart = () => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: {}
  });
};

// Set loading state
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};

export const errorAdding = error => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: error
  });
};

export const clearCart = () => dispatch => {
  dispatch({
    type: CLEAR_CART,
    payload: {}
  });
};
