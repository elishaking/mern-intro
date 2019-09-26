const initialState = {
  isAuthentiated: false,
  user: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    // case SET_CURRENT_USER: // for new user auth
    default:
      return state;
  }
}
