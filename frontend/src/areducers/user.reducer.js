import { GET_ALL_USERS, GET_COMPARE_STATE, GET_LEVEL_MESSAGE, GET_USER } from "../actions/user.action";

const initialState = {
    userInfo: null,
    allUsersInfo: [],
    isCompare: false,
    levelMessage: '',
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
      };
    case GET_COMPARE_STATE:
      return {
        ...state,
        isCompare: action.payload,
      };
    case GET_LEVEL_MESSAGE:
      return {
        ...state,
        levelMessage: action.payload,
      }
    default:
      return state;
  }
}
