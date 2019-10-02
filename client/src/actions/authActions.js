import axios from 'axios';
import { GET_ERRORS } from './types';

// Register User (action creator)
export const registerUser = (userData, history) => (dispatch) => {
  //? short links possible b/cus of proxy setup
  axios.post('/api/users/register', userData)
    .then((res) => history.push('/login'))
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));

  return {
    type: GET_ERRORS,
    payload: userData
  }
};
