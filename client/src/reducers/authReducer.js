import { TEST_DISPATCH } from '../actions/types';

const initialState = {
  isAuthentiated: false,
  user: {}
};

//! REMEMBER: Never mutate the state (initialState), instead copy it

export default function (state = initialState, action) {
  switch (action.type) {
    case TEST_DISPATCH:
      return {
        ...state,
        user: action.payload
      };
    // case SET_CURRENT_USER: // for new user auth
    default:
      return state;
  }
}
