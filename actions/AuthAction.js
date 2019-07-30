import axios from "axios";
import { AsyncStorage } from "react-native";
import { SIGN_UP, GET_ERRORS, SIGN_IN, SIGN_OUT, SET_TOKEN } from "../types";



// prod
const url = "http://37.18.30.150:3000/api";


// dev
// const url = "http://192.168.0.100:3000/api"

export const storeUserToken = async token => {
  console.log(token);
  try {
    await AsyncStorage.setItem("@token", token);
  } catch (error) {
    // Error saving data
    console.log(error);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("@token");
  } catch (error) {
    console.log(error);
    // Error saving data
  }
};

export const signUp = phone => dispatch => {
  console.log(phone);

  axios
    .post(url + "/authorization/register/", phone)
    .then(response => {
      const { data } = response;
      console.log(data);
      dispatch(registerPhone(data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const signIn = user => dispatch => {
  console.log(user);
  axios
    .post(url + "/authorization/code/", user)
    .then(response => {
      const { data } = response;
      console.log(data);
      storeUserToken(data.token);

      dispatch(signInUsername(data));
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const signOut = () => dispatch => {
  removeToken();
  dispatch(signout());
};

export const signInUsername = token => {
  return {
    type: SIGN_IN,
    payload: token.token
  };
};

export const registerPhone = username => {
  return {
    type: SIGN_UP,
    payload: username.username
  };
};

export const signout = () => {
  return {
    type: SIGN_OUT,
    payload: ""
  };
};

export const setToken = (token) => dispatch => {
  dispatch({
    type: SET_TOKEN,
    payload: token
  })
};
