import axios from 'axios';
import {
  PAYMENT_ACCEPTED,
  PAYMENT_CANCELLED,
  PAYMENT_ERROR,
  CLEAR_CART,
  BUTTON_LOADING
} from './types';

export const paymentAccepted = payment => dispatch => {
  axios
    .post('/pay/success', payment)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  dispatch({
    type: PAYMENT_ACCEPTED,
    payload: payment
  });
  dispatch({
    type: CLEAR_CART,
    payload: payment
  });
};

export const paymentCancelled = data => dispatch => {
  axios
    .post('/pay/cancelled', data)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  dispatch({
    type: PAYMENT_CANCELLED,
    payload: data
  });
};

export const paymentError = err => dispatch => {
  console.log('cancelled');
  dispatch({
    type: PAYMENT_ERROR,
    payload: err
  });
};

export const setButtonLoading = value => {
  return {
    type: BUTTON_LOADING,
    payload: value
  };
};
