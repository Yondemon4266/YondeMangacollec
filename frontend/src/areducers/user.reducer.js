import { GET_USER } from "../actions/user.action";

const initialState = {
    userInfo: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
          ...state,
          userInfo: action.payload
        }
    default:
      return state;
  }
}
