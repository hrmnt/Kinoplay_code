import { TOGGLE_DRAWER } from "../types";

const initialState = {
  toggle: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DRAWER:
        console.log("DAS")
      return {
        ...state,
        toggle: !state.toggle
      };
    default:
      return {
        ...state
      };
  }
}
