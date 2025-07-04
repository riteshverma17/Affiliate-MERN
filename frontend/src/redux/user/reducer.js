import { CLEAR_USER, SET_USER } from "./actions";

const initialState = null;

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // ✅ This case sets user details (e.g., after login)
    case SET_USER:
      return action.payload;

    // ✅ This case clears user details (e.g., after logout)
    case CLEAR_USER:
      return initialState;

    // ✅ Default: return current state if action type doesn't match
    default:
      return state;
  }
};
