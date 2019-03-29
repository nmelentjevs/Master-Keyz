import axios from 'axios';
import {
  DELETE_FROM_BASKET,
  ADD_TO_BASKET,
  GET_ERRORS,
  ITEMS_LOADING,
  PLUS_TOTAL,
  MINUS_TOTAL
} from './types';

export const addItem = item => dispatch => {
  dispatch({
    type: ADD_TO_BASKET,
    payload: item
  });
  dispatch({
    type: PLUS_TOTAL,
    payload: item.price
  });
};

export const deleteItem = (id, price) => dispatch => {
  dispatch({
    type: DELETE_FROM_BASKET,
    payload: id
  });
  dispatch({
    type: MINUS_TOTAL,
    payload: price
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

export const pay = (total, basket) => dispatch => {
  const payData = {
    total,
    basket
  };
  axios
    .post('/pay', payData)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};
