import { GET_PROFILE, UPDATE_PROFILE } from "../types";

const initialState = {
  user: {},
  update: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        user: action.payload,
        update: false
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        update: true
      };
    default:
      return {
        ...state
      };
  }
}
