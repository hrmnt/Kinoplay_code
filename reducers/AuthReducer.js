import { SIGN_UP, SIGN_IN, SIGN_OUT, SET_TOKEN } from "../types";

const initialState = {
  token: null,
  registered:false,
  username:undefined
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        username: action.payload
      };
      case SIGN_IN:{
        return{
          ...state,
          token: action.payload
        }
      }
      case SIGN_OUT:{
        return{
          ...state,
          token: null
        }
      }
      case SET_TOKEN:{
        return{
          ...state,
          token: action.payload
        }
      }
    default:
      return {
        ...state
      };
  }
}
