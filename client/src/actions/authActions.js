import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

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

// Login User - Gets user token
export const loginUser = (userData) => (dispatch) => {
  axios.post('/api/users/login', userData)
    .then((res) => {
      // save token to localStorage
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);

      // set token to Auth Header
      setAuthToken(token);

      // Decode token to get user data
      const decoded = jwt_decode(token);

      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

/// Set logged in user
export const setCurrentUser = (decoded) => ({
  type: SET_CURRENT_USER,
  payload: decoded
});
