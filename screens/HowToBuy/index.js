import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView
} from "react-native";
import { getHeight, getWidth } from "../../constants";
import image17 from "../../assets/image17.png";
import iPhoneQr from "../../assets/iPhoneQr.png";
import background from "../../assets/background.png";
import { Header, Button } from "../../commons";
import icQr from "../../assets/ic_qr.png";
import red from "../../assets/red.png";
import * as Animatable from "react-native-animatable";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import playS from "../../assets/icPlay.png";
import icQrS from "../../assets/icQr.png";
import icMan from "../../assets/icMan.png";
import { signOut } from "../../actions/AuthAction";
import { NavigationActions, StackActions } from "react-navigation";

import greenblue from "../../assets/greenblue.png";
import blue from "../../assets/blue.png";
import icRateUs from "../../assets/icRateUs.png";
import sun from "../../assets/sun.png";
import quit from "../../assets/quit.png";

import { BlurView, VibrancyView } from "@react-native-community/blur";

const { width, height } = Dimensions.get("window");

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX =
platform === "ios" && (deviceHeight === 812 || deviceWidth === 812 || deviceHeight === 896 || deviceWidth === 896);
const smallPhone = deviceWidth< 400

class HowToBuy extends Component {
  state = {
    toggle: false
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
    return (
      <View style={styles.container}>
        <Animatable.View
          style={[
            styles.hWrap,
            {
              position: "absolute",
              left: getWidth(20),
              top: 15,
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
                paddingHorizontal: 20
              }
            ]}
          >
            <TouchableOpacity
              onPress={() => this.navigateToScreen("Home")}
              style={[styles.navBtn, { marginTop: 40 }]}
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
        <SafeAreaView style={styles.wrapContainer}>
          <Header image={red} title={"Как купить?"} />
          <ScrollView contentContainerStyle={styles.pList} style={styles.pInfo}>
            <Text style={styles.welcome}>
              Поздравляем, накопленные баллы вы можете потратить в кинотеатрах
            </Text>
            <Text style={[styles.boxSub, { marginBottom: 40 }]}>
              Для покупки продукций мы предоставили вам 2 способа оплаты
            </Text>
            <View style={[styles.box, { padding: 22 }]}>
              <Text style={styles.boxSub}>
                Для покупки с помощью QR code вам нужно нажать на кнопку Scan &
                Pay и отсканировать QR code на кассах кинотеатра
              </Text>
              <View style={styles.btnWrap}>
                <Button
                  image={icQr}
                  textSize={15}
                  subText={"SCAN & PAY"}
                  text={"KINOPLAY"}
                  gradFirst={"rgb(255,197,103)"}
                  gradSecond={"rgb(255,67,67)"}
                />
              </View>
            </View>
          </ScrollView>
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
    height: height,
    width: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    overflow: "hidden"
  },
  pInfo: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.5)"
  },
  pList: {
    paddingHorizontal: getWidth(20),
    paddingVertical: getWidth(30)
  },
  promo: {
    height: getHeight(251)
  },
  blur: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "rgba(21,22,65,0.5)",
    height: "100%",
    width: "100%",
    borderRadius: 20
  },
  box: {
    borderRadius: 20,
    backgroundColor: "rgb(40,42,100)",
    marginBottom: getWidth(25)
  },
  boxNumber: {
    fontSize: 25,
    color: "rgb(31,213,255)",
    marginBottom: 5
  },
  boxSub: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "SFProDisplay-Regular",
    lineHeight: 16,
    marginBottom: 20
  },
  phone: {
    alignSelf: "center",
    width: getWidth(187),
    height: getHeight(374)
  },
  welcome: {
    color: "#fff",
    fontSize: 22,
    lineHeight: 24,
    fontFamily: "SFProDisplay-Semibold",
    marginBottom: 20,
    width: "80%"
  },
  btnWrap: {
    paddingHorizontal: getWidth(54)
  },
  btnStyle: {
    width: "100%"
  },
  sidecontainer: {
    flex: 1,
    position: "absolute",
    zIndex: 9999,
    height: "100%",
    width: getWidth(304),
    borderTopRightRadius: 48,
    borderBottomRightRadius: 48

    // justifyContent: 'center',
    // alignItems: 'center'
  },
  hWrap: {
    top: isIphoneX ? 45: 20,
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
    marginBottom: getHeight(6)
  },
  secondL: {
    width: getWidth(28),
    height: getWidth(3),
    backgroundColor: "#fff",
    borderRadius: 5,
    position: "absolute",
    bottom: 0,
    top: getHeight(18)
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
    top: getHeight(9),

    marginBottom: getHeight(6)
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
    marginLeft: 20
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
    marginLeft: 20
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
  signOut: bindActionCreators(signOut, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HowToBuy);
