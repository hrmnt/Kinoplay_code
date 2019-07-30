import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  Alert,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProfile } from "../../actions/UserActions";

import { getHeight, getWidth } from "../../constants";
import background from "../../assets/background.png";
import qrButton from "../../assets/qrButton.png";

import arrow from "../../assets/arrow.png";
import { Header } from "../../commons";
import icWoman from "../../assets/icWoman.png";
import icEdit from "../../assets/icEdit.png";

import playS from "../../assets/icPlay.png";
import icQrS from "../../assets/icQr.png";
import icMan from "../../assets/icMan.png";
import { signOut } from "../../actions/AuthAction";
import { NavigationActions, StackActions } from "react-navigation";

import greenblue from "../../assets/greenblue.png";
import red from "../../assets/red.png";
import blue from "../../assets/blue.png";
import icRateUs from "../../assets/icRateUs.png";
import sun from "../../assets/sun.png";
import quit from "../../assets/quit.png";
import LinearGradient from "react-native-linear-gradient";

import { BlurView, VibrancyView } from "@react-native-community/blur";

import * as Animatable from "react-native-animatable";

const { width } = Dimensions.get("window");

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

class Profile extends Component {
  state = {
    toggle: false
  };

  componentDidMount() {
    this.bonusC.transitionTo(
      {
        top: 0,
        right: getWidth(34)
      },
      1000,
      "ease-in-out"
    );
    this.games.transitionTo(
      {
        left: getWidth(0), //25
        top: getWidth(200) // 131
      },
      1200,
      "ease-in-out"
    );
    this.top.transitionTo(
      {
        right: getWidth(5), //25
        top: getWidth(216) //148
      },
      1200,
      "ease-in-out"
    );
  }

  changeProfile = () => {
    this.props.navigation.navigate("EditUser");
  };

  goBack = () => {
    const { navigation } = this.props;
    navigation.navigate("Home");
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.authReducer.token);
    if (nextProps.authReducer.token === null) {
      this.toAuth();
    }
  }

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
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    const { userReducer } = this.props;
    const { user } = userReducer;
    const { username, statistics } = user;
    return (
      <View style={styles.container}>
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
        <Animated.View style={styles.bg}>
          <Animated.Image
            source={background}
            style={{ width: "100%", height: "100%" }}
          />
        </Animated.View>
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
                borderBottomLeftRadius: 100,
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
            style={[
              styles.wrap,
              {
                backgroundColor: "rgba(40,42,100,0.75)",
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
                paddingHorizontal:20
              }
            ]}
          >
            <TouchableOpacity
              onPress={() => this.navigateToScreen("Home")}
              style={[styles.navBtn, {marginTop:40}]}
            >
              <Image style={styles.navIcon} source={playS} />
              <Text style={styles.navTxt}>Начать игру</Text>
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

        <TouchableOpacity
          style={{
            width: 88,
            height: 88,
            position: "absolute",
            alignSelf: "center",
            top: getHeight(677),
            zIndex: 100
          }}
          onPress={() => this.errorPress()}
        >
          <Image style={{ width: 88, height: 88 }} source={qrButton} />
        </TouchableOpacity>
        <SafeAreaView style={styles.wrapContainer}>
          <Header
            titleStyle={{
              fontFamily: "SFProDisplay-Semibold"
            }}
            title={statistics.balance + " B"}
          />
          <View style={styles.pInfo}>
            <View style={styles.detI}>
              <View style={[styles.row]}>
                <TouchableOpacity onPress={() => this.goBack()}>
                  <Image style={styles.back} source={arrow} />
                </TouchableOpacity>
                <Image style={styles.pnavIcon} source={icWoman} />
              </View>
              <View
                style={[
                  styles.row,
                  styles.sideView,
                  { justifyContent: "center" }
                ]}
              >
                <Text
                  style={[
                    styles.pnavTxt,
                    {
                      fontFamily: "SFProDisplay-Bold",
                      fontSize: getWidth(35),
                      letterSpacing: 0.6,
                      lineHeight: getHeight(42)
                    }
                  ]}
                >
                  {username}
                </Text>
              </View>
              <View style={[styles.row]}>
                <TouchableOpacity onPress={() => this.changeProfile()}>
                  <Image style={styles.pnavIcon} source={icEdit} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bubbleWrap}>
              <Animatable.View
                style={styles.btnFill}
                ref={ref => (this.bonusC = ref)}
              >
                <LinearGradient
                  start={[0.8, 0.2]}
                  style={styles.btnFillCircle}
                  colors={["rgb( 31,213,255)", "rgb( 45,44,253)"]}
                >
                  <View style={styles.tt} onPress={() => this.getCode()}>
                    <Text style={styles.btnT}>{statistics.balance}</Text>
                    <Text style={styles.btnTF}>Бонусов</Text>
                  </View>
                </LinearGradient>
              </Animatable.View>

              <Animatable.View
                style={styles.btnFillSecond}
                ref={ref => (this.games = ref)}
              >
                <LinearGradient
                  start={[0.2, 0.3]}
                  style={styles.btnFillSecondCircle}
                  colors={["rgb(205,107,252)", "rgb(  255,80,177)"]}
                >
                  <View style={styles.tt} onPress={() => this.getCode()}>
                    <Text style={styles.btnT}>{statistics.game_amount}</Text>
                    <Text style={styles.btnTF}>Игр сыграно</Text>
                  </View>
                </LinearGradient>
              </Animatable.View>

              <Animatable.View
                style={styles.btnFillThird}
                ref={ref => (this.top = ref)}
              >
                <LinearGradient
                  start={[0.2, 0.1]}
                  style={styles.btnFillThirdCircle}
                  colors={["rgb(13,224,120)", "rgb(  0,102,229)"]}
                >
                  <View style={styles.tt} onPress={() => this.getCode()}>
                    <Text style={styles.btnT}>{statistics.top_games}</Text>
                    <Text style={styles.btnTF}>Был в топ 10</Text>
                  </View>
                </LinearGradient>
              </Animatable.View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(40,42,100)"
  },
  wrapContainer: {
    flex: 1
  },
  bg: {
    height: getHeight(721),
    width: "100%",
    position: "absolute",
    borderBottomLeftRadius: width / 2,
    borderBottomRightRadius: width / 2,
    overflow: "hidden"
  },
  logo: {
    marginTop: getHeight(96),
    marginBottom: getHeight(137),
    height: getHeight(85),
    width: getWidth(130)
  },
  playBtnWrap: {
    marginBottom: getHeight(100)
  },
  playBtn: {
    height: getWidth(130),
    width: getWidth(130)
  },
  icManWrap: {
    marginBottom: getHeight(34)
  },
  icMan: {
    width: 58,
    height: 58
  },
  pInfo: {
    paddingTop: getHeight(49),
    paddingHorizontal: getWidth(20)
  },
  detI: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: getWidth(33)
  },
  back: {
    height: 21,
    width: 21,
    marginRight: 8
  },
  pnavIcon: {
    height: getHeight(36),
    width: getHeight(36)
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  sideView: {
    flex: 1,
    alignItems: "center"
  },
  pnavTxt: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "SFProDisplay-Regular",
    textAlign: "center"
  },
  bubbleWrap: {
    paddingHorizontal: getWidth(20)
  },
  btnFill: {
    position: "absolute",
    right: getWidth(-160),
    top: getWidth(-100)
  },
  btnFillCircle: {
    height: getWidth(203),
    alignItems: "center",
    justifyContent: "center",
    width: getWidth(203),
    borderRadius: 102
  },
  btnT: {
    fontSize: getHeight(50),
    fontFamily: "SFProDisplay-Bold",
    color: "#fff",
    letterSpacing: -0.5,

    textShadowOffset: { width: -1, height: 0 },
    textShadowColor: "rgba(255, 255, 255, 0.75)",
    textShadowRadius: 4
  },
  btnTF: {
    color: "#fff",
    fontFamily: "SFProDisplay-Regular",
    fontSize: getHeight(16),
    lineHeight: getHeight(19),
    textShadowOffset: { width: -1, height: 0 },
    textShadowColor: "rgba(255, 255, 255, 0.75)",
    textShadowRadius: 4
  },
  tt: {
    alignItems: "center"
  },
  btnFillSecond: {
    position: "absolute",
    left: getWidth(-135), //25
    top: getWidth(60) // 131
  },
  btnFillSecondCircle: {
    height: getWidth(165),
    alignItems: "center",
    justifyContent: "center",
    width: getWidth(165),
    borderRadius: 110
  },
  btnFillThird: {
    position: "absolute",
    right: getWidth(-119), //25
    top: getWidth(144) //148
  },
  btnFillThirdCircle: {
    height: getWidth(144),
    alignItems: "center",
    justifyContent: "center",
    width: getWidth(144),
    borderRadius: getHeight(144)
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
    top: isIphoneX ? 45:20,
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
    marginBottom: 5,
    marginLeft:20
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
    borderRadius: 18,
    marginLeft:20
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
  signOut: bindActionCreators(signOut, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
