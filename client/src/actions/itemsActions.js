import axios from 'axios';
import { GET_ITEMS, GET_ERRORS, ITEMS_LOADING, GET_USER_ITEMS } from './types';

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get('/api/items/all')
    .then(res => {
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getCurrentUserItems = email => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get(`/api/items/${email}`)
    .then(res => {
      dispatch({
        type: GET_USER_ITEMS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addItems = data => {
  axios
    .post('/api/items/add', data)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

// Set loading state
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
