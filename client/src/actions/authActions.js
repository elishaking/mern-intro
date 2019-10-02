import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

/// Register User (action creator)
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

/// Login User - Gets user token
export const loginUser = (userData) => (dispatch) => {
  axios.post('/api/users/login', userData)
    .then((res) => {
      // save token to localStorage
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);

      // set token to Auth Header
      setAuthToken(token);

      // Decode token to get user data
      const decodedUserData = jwt_decode(token);

      // Set current user
      dispatch(setCurrentUser(decodedUserData));
    })
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

/// Log user out
export const logoutUser = () => (dispatch) => {
  // remove token from localStorage
  localStorage.removeItem('jwtToken');

  // remove auth header for future requests
  setAuthToken(false); // equivalent to setAuthToken()

  // set current user to {} (empty object) which will isAuthenticated to false
  dispatch(setCurrentUser({}));
};

/// Set logged in user
export const setCurrentUser = (decodedUserData) => ({
  type: SET_CURRENT_USER,
  payload: decodedUserData
});
