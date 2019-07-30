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
  ScrollView,
  Alert,
  Platform
} from "react-native";
import { getHeight, getWidth } from "../../constants";
import image17 from "../../assets/image17.png";
import iPhoneQr from "../../assets/iPhoneQr.png";
import red from "../../assets/red.png";

import greenblue from "../../assets/greenblue.png";
import background from "../../assets/background.png";
import { Header, Button } from "../../commons";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";

import { BlurView, VibrancyView } from "@react-native-community/blur";


import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import playS from "../../assets/icPlay.png";
import icQrS from "../../assets/icQr.png";
import icMan from "../../assets/icMan.png";
import { signOut } from "../../actions/AuthAction";
import { NavigationActions, StackActions } from "react-navigation";

import blue from "../../assets/blue.png";
import icRateUs from "../../assets/icRateUs.png";
import sun from "../../assets/sun.png";
import quit from "../../assets/quit.png";


const { width, height } = Dimensions.get("window");

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


class HowToPlay extends Component {
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

  toGame = () => {
    this.props.navigation.navigate("StartGame");
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
              zIndex: 99999,
              top: 15,
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
          style={[styles.sidecontainer, { left: -getWidth(304), overflow:"hidden" }]}
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
        
           <Animated.View style={styles.bg}>
          <Animated.Image
            source={background}
            style={{ width: "100%", height: "100%" }}
          />
        </Animated.View>
        <SafeAreaView style={styles.wrapContainer}>
          <Header image={greenblue} title={"Как играть?"} />
          <ScrollView contentContainerStyle={styles.pList} style={styles.pInfo}>
            <View style={styles.box}>
              <Image style={styles.promo} source={image17} />
              <View style={styles.blur} />
            </View>
            <View style={[styles.box, { padding: 22 }]}>
              <Text style={styles.boxNumber}>1</Text>
              <Text style={styles.boxSub}>
                Нажмите на кнопку «play» и отсканируйте QR код с экрана
                кинотеатра.
              </Text>
              <Image
                resizeMode="contain"
                style={styles.phone}
                source={iPhoneQr}
              />
            </View>
            <View style={[styles.box, { padding: 22 }]}>
              <Text style={styles.boxNumber}>2</Text>
              <Text style={[styles.boxSub, { marginBottom: 0 }]}>
                После того как вы подключились ваше имя должно появиться на
                экране кинотеатра
              </Text>
            </View>
            <View style={[styles.box, { padding: 22 }]}>
              <Text style={styles.boxNumber}>3</Text>
              <Text style={[styles.boxSub, { marginBottom: 0 }]}>
                После того как закончиться отсчёт времени игра автоматический
                начнётся
              </Text>
            </View>
            <View style={[styles.box, { padding: 22 }]}>
              <Text style={styles.boxNumber}>4</Text>
              <Text style={[styles.boxSub, { marginBottom: 0 }]}>
                Выберите один из вариантов ответа, чем быстрее и правильнее вы
                будете отвечать тем больше вероятность победы
              </Text>
            </View>
            <Text style={styles.welcome}>
              Поздравляем, накопленные баллы вы можете потратить в кинотеатрах
            </Text>
            <View style={styles.btnWrap}>
              <LinearGradient
                start={[1.2, 0.1]}
                style={[styles.btnFill]}
                colors={["rgb(255,54,165)", "rgb(190,56,255)"]}
              >
                <TouchableOpacity
                  onPress={this.toGame}
                  style={[
                    styles.btnFill,
                    {
                      alignItems: "center",
                      justifyContent: "center"
                    }
                  ]}
                >
                  <Text style={[styles.btnT]}>Начать игру</Text>
                </TouchableOpacity>
              </LinearGradient>
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
    backgroundColor: "rgb(40,42,100)",
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
  pInfo: {},
  pList: {
    paddingHorizontal: getWidth(20),
    paddingVertical: getWidth(30)
  },
  header: {
    backgroundColor: "rgb(21,22,65)",
    justifyContent: "flex-start"
  },
  promo: {
    height: getHeight(251),
    width: "100%",
    borderRadius: 20
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
    marginBottom: 5,
    fontFamily: "Gilroy-Bold"
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
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "SFProDisplay-Semibold",
    marginBottom: 20
  },
  btnWrap: {
    paddingHorizontal: getWidth(22)
  },
  btnStyle: {
    width: "100%"
  },
  btnFill: {
    alignSelf: "center",
    height: 54,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 27,
    width: "100%"
  },
  btnT: {
    fontSize: 14,
    color: "#fff",
    letterSpacing: 1,
    fontFamily: "SFProDisplay-Semibold"
  },
  sidecontainer: {
    flex: 1,
    position: "absolute",
    zIndex: 9999,
    height: "100%",
    width: getWidth(304),
    borderTopRightRadius: 48,
    borderBottomRightRadius: 48,

    // justifyContent: 'center',
    // alignItems: 'center'
  },
  hWrap: {
    top:isIphoneX? 45: 20,
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
  signOut: bindActionCreators(signOut, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HowToPlay);
