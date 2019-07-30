import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from "./navigation/Router";
import rootStore from "./reducers";
import { createStore, applyMiddleware } from 'redux';
import {Provider} from "react-redux";
import ReduxThunk from 'redux-thunk'

const store = createStore(rootStore,applyMiddleware(ReduxThunk));

console.disableYellowBox = true;


export default class App extends React.Component {
  state ={
    ready:false
  }

 
  render() {
      return (
        <Provider store={store}>
          <AppContainer/>
          </Provider>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
