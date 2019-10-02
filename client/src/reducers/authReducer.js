import { TEST_DISPATCH, SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  isAuthentiated: false,
  user: {}
};

//! REMEMBER: Never mutate the state (initialState), instead copy it

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthentiated: !isEmpty(action.payload),
        user: action.payload
      };

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
