import axios from 'axios';
import {
  GET_ITEMS,
  // DELETE_FROM_BASKET,
  // ADD_TO_BASKET,
  // EDIT_BASKET,
  GET_ERRORS,
  ITEMS_LOADING
} from './types';

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

// Set loading state
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
