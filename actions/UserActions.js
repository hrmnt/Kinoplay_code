import axios from "axios";
import { AsyncStorage } from "react-native";
import { GET_PROFILE, GET_ERRORS, UPDATE_PROFILE } from "../types";

// prod
const url = "http://37.18.30.150:3000/api";

// dev
// const url = "http://192.168.0.100:3000/api"

export const signIn = phone => dispatch => {};

const retrieveToken = async () => {
  try {
    const value = await AsyncStorage.getItem("@token");
    if (value !== null) {
      console.log("token retrive", value);
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
};

export const getProfile = () => async dispatch => {
  console.log("GET TOKEN");
  const token = await retrieveToken();
  console.log("GET TOKEN", token);
  axios
    .get(url + "/authorization/profile", {
      headers: {
        Authorization: "Token " + token
      }
    })
    .then(response => {
      const { data } = response;
      console.log(data);
      dispatch(getUser(data));
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const updateProfile = user => async dispatch => {
  console.log(user);
  const token = await retrieveToken();
  console.log(user);
  axios
    .patch(url + "/user/" + user._id, user)
    .then(response => {
      const { data } = response;
      console.log("asdasd");
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getUser = data => {
  return {
    type: GET_PROFILE,
    payload: data
  };
};

export const updateUser = data => {
  return {
    type: UPDATE_PROFILE,
    payload: ""
  };
};
