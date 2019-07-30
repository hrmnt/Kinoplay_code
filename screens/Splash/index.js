import React, { Component } from "react";
import { View, Image, StyleSheet, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProfile } from "../../actions/UserActions";
import logoFlip from "../../assets/logoFilp.png";
import logo from "../../assets/logo.png";
import { StackActions, NavigationActions } from "react-navigation";

class Splash extends Component {
  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem("@token");
      if (value !== null) {

        this.toMainProfile();
      } else {
        this.toSignIn();

      }
    } catch (error) {
      this.toSignIn();

      console.log(error);
      // Error retrieving data
    }
  }

  toSignIn = () => {
    const { navigation } = this.props;
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: "AuthStack" })]
    });
    navigation.dispatch(resetAction);
  };

  toMainProfile = () => {
    const { navigation } = this.props;
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: "MainStack" })]
    });
    navigation.dispatch(resetAction);
  };
  render() {
    return (
      <View style={styles.container}>
        <Image resizeMode={"contain"} style={styles.image} source={logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151641",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    height: 140
  }
});

const mapStateToProps = ({ userReducer, errorsReducer }) => {
  return { userReducer, errorsReducer };
};

const mapDispatchToProps = dispatch => ({
  getProfile: bindActionCreators(getProfile, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash);
