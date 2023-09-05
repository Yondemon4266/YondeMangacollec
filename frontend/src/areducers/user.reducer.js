import { GET_ALL_USERS, GET_USER } from "../actions/user.action";

const initialState = {
    userInfo: null,
    allUsersInfo: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
          ...state,
          userInfo: action.payload
        };
    case GET_ALL_USERS:
      return {
        ...state,
        allUsersInfo: action.payload,
      }
    default:
      return state;
  }
}
