import React from "react";
import {Platform} from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";
import SideBar from "../commons/Sidebar";
import {
  SignIn,
  ChangeProfile,
  Home,
  Profile,
  HowToPlay,
  HowToBuy,
  StartGame,
  Game,
  QGame,
  HighScore,
  StoryTelling,
  EditUser,
  Splash,
  Privacy
} from "../screens";
import { getWidth } from "../constants";





const AuthStack = createStackNavigator(
  {
    SignIn: {
      screen: SignIn
    },
    Privacy
  },
  {
    headerMode: "none"
  }
);


const GameStack = createStackNavigator({
  headerMode: "none"
});

const MainStack = createDrawerNavigator(
  {

    Home,
    Profile,
    HowToBuy,
    HowToPlay,
    Game,
    QGame,
    StartGame,
    HighScore,

    StoryTelling,

    EditUser,
    EditUser


  },
  {
    headerMode: "none",
    // contentComponent: SideBar,
    drawerBackgroundColor: "transparent",
    drawerWidth: 305,
    drawerLockMode:'locked-closed'
  }
);

const App = createStackNavigator(
  {

    Splash,
    AuthStack,
    
    MainStack,



  },
  {
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(App);

export default AppContainer;
