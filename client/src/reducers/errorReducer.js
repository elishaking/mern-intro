import { GET_ERRORS } from '../actions/types';

const initialState = {
  isAuthentiated: false,
  user: {}
};

//! REMEMBER: Never mutate the state (initialState), instead copy it

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;

    default:
      return state;
  }
}
