import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  Alert,
  Button as BTN,
  Animated,
  Dimensions,
  Platform
} from "react-native";
import { NavigationActions, StackActions } from "react-navigation";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SafeAreaView } from "react-navigation";
import * as Animatable from "react-native-animatable";

import { getProfile } from "../../actions/UserActions";
import { setToken } from "../../actions/AuthAction";
import { toggleDrawer } from "../../actions/SidebarActions";
import { signOut } from "../../actions/AuthAction";
import { setNewGame } from "../../actions/GameAction";

import { getHeight, getWidth, statusBarHeight } from "../../constants";
import logoFlip from "../../assets/logoFilp.png";
import play from "../../assets/play.png";
import icMan from "../../assets/icMan.png";
import background from "../../assets/background.png";
import { Header, Button } from "../../commons";
import icQr from "../../assets/ic_qr.png";

import playS from "../../assets/icPlay.png";
import icQrS from "../../assets/icQr.png";

import greenblue from "../../assets/greenblue.png";
import red from "../../assets/red.png";
import blue from "../../assets/blue.png";
import icRateUs from "../../assets/icRateUs.png";
import sun from "../../assets/sun.png";
import quit from "../../assets/quit.png";
import { BlurView, VibrancyView } from "@react-native-community/blur";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX =
  platform === "ios" &&
  (deviceHeight === 812 ||
    deviceWidth === 812 ||
    deviceHeight === 896 ||
    deviceWidth === 896);
const smallPhone = deviceWidth < 400;

class Home extends Component {
  state = {
    toggle: false,
    intensity: 30
  };
  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem("@token");
      if (value !== null) {
        this.props.setToken(value);

        console.log("token retrive", value);
        this.props.getProfile();
      }
    } catch (error) {
      // this.toSignIn();

      console.log(error);
      // Error retrieving data
    }

    try {
      this.profileBtn.fadeInUpBig(1000);
      this.kinoplayBtn.fadeInUpBig(1200);
      this.logo.transitionTo(
        {
          opacity: 1
        },
        1000
      );
    } catch (e) {
      console.log(e);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.authReducer.token);
    if (nextProps.authReducer.token === null) {
      this.toAuth();
    }
  }
  toGame = () => {
    const { navigation } = this.props;
    this.props.setNewGame();
    navigation.navigate("StartGame");
  };

  toProfile = () => {
    const { navigation } = this.props;
    navigation.navigate("Profile");
  };

  toAuth = () => {
    const { navigation } = this.props;
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: "AuthStack" })]
    });
    navigation.dispatch(resetAction);
  };

  onHamburger = () => {
    console.log("drawer");
    // this.props.toggleDrawer();

    if (this.state.toggle) {
      this.navigation.transitionTo(
        {
          left: -getWidth(304)
        },
        500
      );
      this.fL.transitionTo(
        {
          top: 0,
          left: 0,
          width: getWidth(28),
          transform: [{ rotate: "0deg" }]
        },
        500
      );
      this.sL.transitionTo(
        {
          top: getHeight(18),
          left: 0,
          width: getWidth(28),

          transform: [{ rotate: "0deg" }]
        },
        500
      );
      this.tL.transitionTo(
        {
          opacity: 1
        },
        500
      );

      this.setState({
        toggle: false,
        intensity: 0
      });
    } else {
      this.fL.transitionTo(
        {
          top: 8,
          left: -4,
          width: getWidth(28),
          transform: [{ rotate: "45deg" }]
        },
        500
      );
      this.sL.transitionTo(
        {
          top: 8,
          left: -4,
          width: getWidth(28),

          transform: [{ rotate: "-45deg" }]
        },
        500
      );
      this.tL.transitionTo(
        {
          opacity: 0
        },
        500
      );
      this.navigation.transitionTo(
        {
          left: getWidth(0)
        },
        500
      );
      this.setState({
        toggle: true
      });
    }
  };

  errorPress = () => {
    Alert.alert(
      "Предупреждение",
      "На данный момент функция не доступна",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  signout = () => {
    this.props.signOut();
  };

  navigateToScreen = route => {
    this.navigation.transitionTo(
      {
        left: -getWidth(304)
      },
      100
    );
    this.fL.transitionTo(
      {
        top: 0,
        left: 0,
        width: getWidth(28),
        transform: [{ rotate: "0deg" }]
      },
      100
    );
    this.sL.transitionTo(
      {
        top: getHeight(18),
        left: 0,
        width: getWidth(28),

        transform: [{ rotate: "0deg" }]
      },
      100
    );
    this.tL.transitionTo(
      {
        opacity: 1
      },
      100
    );

    this.setState({
      toggle: false,
      intensity: 0
    });
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    console.log(this.props.authReducer.token);

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <Animatable.View
          style={[
            styles.hWrap,
            {
              position: "absolute",
              left: getWidth(20),
              top: 10,
              zIndex: 99999
            }
          ]}
          ref={ref => (this.hamW = ref)}
        >
          <TouchableOpacity style={styles.hWrap} onPress={this.onHamburger}>
            <Animatable.View
              ref={ref => (this.fL = ref)}
              style={styles.firstL}
            />
            <Animatable.View
              ref={ref => (this.tL = ref)}
              style={styles.thirdL}
            />
            <Animatable.View
              ref={ref => (this.sL = ref)}
              style={styles.secondL}
            />
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View
          ref={ref => (this.navigation = ref)}
          style={[
            styles.sidecontainer,
            { left: -getWidth(304), overflow: "hidden" }
          ]}
        >
          <BlurView
            style={[
              styles.wrap,
              {
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
              }
            ]}
            overlayColor="rgba(40,42,100,0.75)"
            blurType="light"
            blurAmount={20}
          />

          <SafeAreaView
            tint="dark"
            intensity={100}
            style={[
              styles.wrap,
              {
                backgroundColor: "rgba(40,42,100,0.75)",
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
              }
            ]}
          >
            <TouchableOpacity
              onPress={() => this.navigateToScreen("Home")}
              style={[styles.navBtn,{marginTop:40}]}
            >
              <Image style={styles.navIcon} source={playS} />
              <Text style={[styles.navTxt, ]}>Начать игру</Text>
            </TouchableOpacity>
            <View style={[styles.firstBtnWrap]}>
              <TouchableOpacity
                onPress={() => this.navigateToScreen("Profile")}
                style={[styles.navBtn]}
              >
                <Image style={styles.navIcon} source={icMan} />
                <Text
                  style={[
                    styles.navTxt,
                    {
                      fontFamily: "SFProDisplay-Bold",
                      fontSize: 17,
                      letterSpacing: 0.5
                    }
                  ]}
                >
                  {this.props.userReducer.user.username}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.errorPress()}
                style={[styles.navBtn, { marginTop: 10 }]}
              >
                <Image style={styles.navIcon} source={icQrS} />
                <Text style={[styles.navTxt, { letterSpacing: 0.5 }]}>
                  Scan & pay
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.firstBtnWrap, {}]}>
              <TouchableOpacity
                onPress={() => this.navigateToScreen("HowToBuy")}
                style={[styles.navBtn, { marginTop: 10 }]}
              >
                <Image style={styles.navIcon} source={red} />
                <Text style={[styles.navTxt, { letterSpacing: 0.5 }]}>
                  Как купить
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.navigateToScreen("HowToPlay")}
                style={[styles.navBtn, { marginTop: 10 }]}
              >
                <Image style={styles.navIcon} source={greenblue} />
                <Text style={[styles.navTxt, { letterSpacing: 0.5 }]}>
                  Как играть
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.errorPress()}
                style={[styles.navBtn, { marginTop: 10 }]}
              >
                <Image style={styles.navIcon} source={blue} />
                <Text style={[styles.navTxt, { letterSpacing: 0.5 }]}>
                  О нас
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.errorPress()}
                style={[styles.navBtn, { marginTop: 10 }]}
              >
                <Image style={styles.navIcon} source={icRateUs} />
                <Text style={[styles.navTxt, { letterSpacing: 0.5 }]}>
                  Оцените нас
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.helpWrap}>
              <View style={styles.ssWrap} />
              <TouchableOpacity
                onPress={() => this.errorPress()}
                style={[styles.navBtn, { marginTop: 0 }]}
              >
                <View style={styles.sunWrap}>
                  <Image style={styles.sunIcon} source={sun} />
                </View>
                <View style={{ color: "transparent" }}>
                  <Text style={[styles.helpTxt]}>Обратная связь</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.errorPress()}
                style={[styles.navBtn, { marginTop: 10 }]}
              >
                <View style={styles.sunWrap}>
                  <Image style={styles.sunIcon} source={sun} />
                </View>
                <Text style={[styles.helpTxt]}>Как купить</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.errorPress()}
                style={[styles.navBtn, { marginTop: 10 }]}
              >
                <View style={styles.sunWrap}>
                  <Image style={styles.sunIcon} source={sun} />
                </View>

                <Text style={[styles.helpTxt]}>Как купить</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 0 }}>
              <TouchableOpacity
                onPress={() => this.signout()}
                style={[styles.navBtn]}
              >
                <Image style={styles.navIcon} source={quit} />
                <Text style={[styles.navTxt]}>Выход</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animatable.View>
        <ImageBackground
          source={background}
          style={{ flex: 1, marginLeft: -1 }}
        >
          <SafeAreaView
            forceInset={{ top: "never" }}
            style={styles.wrapContainer}
          >
            <Animatable.Image
              ref={ref => (this.logo = ref)}
              style={styles.logo}
              source={logoFlip}
            />
            <TouchableOpacity
              onPress={() => this.toGame()}
              style={styles.playBtnWrap}
            >
              <Image
                resizeMode={"cover"}
                style={styles.playBtn}
                source={play}
              />
            </TouchableOpacity>
            <Animatable.View ref={ref => (this.profileBtn = ref)}>
              <TouchableOpacity
                onPress={() => this.toProfile()}
                style={styles.icManWrap}
              >
                <Image
                  resizeMode={"cover"}
                  style={styles.icMan}
                  source={icMan}
                />
              </TouchableOpacity>
            </Animatable.View>
            {/*<TouchableOpacity style={styles.icManWrap}>*/}
            {/*    <Image resizeMode={"cover"} style={styles.icMan}  source={icMan} />*/}
            {/*</TouchableOpacity>*/}
            <Animatable.View
              ref={ref => (this.kinoplayBtn = ref)}
              style={styles.btnWrap}
            >
              <Button
                onPress={() => this.errorPress()}
                image={icQr}
                textSize={15}
                subText={"SCAN & PAY"}
                text={"KINOPLAY"}
                gradFirst={"rgb(255,197,103)"}
                gradSecond={"rgb(255,67,67)"}
              />
            </Animatable.View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapContainer: {
    flex: 1
  },
  logo: {
    marginTop: getHeight(60),
    marginBottom: getHeight(136),
    height: 85,
    width: 130,
    alignSelf: "center",
    opacity: 0
  },
  playBtnWrap: {
    marginBottom: getHeight(100),
    height: getWidth(140),
    width: getWidth(140),
    alignSelf: "center"
  },
  playBtn: {
    height: getWidth(140),
    width: getWidth(140),
    alignSelf: "center",
    zIndex: 100
  },
  icManWrap: {
    marginBottom: getHeight(28),
    alignSelf: "center"
  },
  icMan: {
    width: getWidth(58),
    height: getWidth(58)
  },
  btnWrap: {
    width: getWidth(175),
    alignSelf: "center"
  },
  sidecontainer: {
    flex: 1,
    position: "absolute",
    zIndex: 9999,
    height: "100%",
    width: getWidth(304),
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  hWrap: {
    top: isIphoneX ? 45 : 20,
    width: getHeight(50),
    height: getHeight(50)
  },
  firstL: {
    width: getWidth(28),
    height: getWidth(3),
    backgroundColor: "#fff",
    borderRadius: 5,
    position: "absolute",
    top: 0,
    marginBottom: 6
  },
  secondL: {
    width: getWidth(28),
    height: getWidth(3),
    backgroundColor: "#fff",
    borderRadius: 5,
    position: "absolute",
    bottom: 0,
    top: 18
    // left:-4,

    // transform: [
    //   { rotate: '-45deg'},

    // ],
  },
  thirdL: {
    width: getWidth(28),
    height: getWidth(3),
    backgroundColor: "#fff",
    borderRadius: 5,
    position: "absolute",
    top: 9,

    marginBottom: 6
  },
  wrap: {
    justifyContent: "space-around",
    paddingHorizontal: 20,
    zIndex: 10,
    flex: 1
  },
  scrollView: {
    flex: 1
  },
  navBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5
  },
  navIcon: {
    height: getHeight(36),
    width: getHeight(36),
    marginRight: 20
  },
  navTxt: {
    color: "#fff",
    fontSize: getWidth(17),
    lineHeight: getHeight(20),
    fontFamily: "SFProDisplay-Regular"
  },
  firstBtnWrap: {},
  helpWrap: {
    paddingVertical: 9
  },
  ssWrap: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.1)",
    height: "100%",
    marginTop: getHeight(5),
    paddingVertical: 10,
    width: getWidth(36),
    borderRadius: 18
  },
  helpTxt: {
    fontSize: getHeight(17),
    letterSpacing: 0.4,
    color: "rgba(255,255,255, 0.6)"
  },
  sunWrap: {
    width: getWidth(36),
    height: getWidth(36),
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20
  },
  sunIcon: {
    height: 20,
    width: 20
  },
  blur: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 0
  }
});

const mapStateToProps = ({ authReducer, userReducer, errorsReducer }) => {
  return { authReducer, userReducer, errorsReducer };
};

const mapDispatchToProps = dispatch => ({
  getProfile: bindActionCreators(getProfile, dispatch),
  setToken: bindActionCreators(setToken, dispatch),
  toggleDrawer: bindActionCreators(toggleDrawer, dispatch),
  signOut: bindActionCreators(signOut, dispatch),
  setNewGame: bindActionCreators(setNewGame, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
