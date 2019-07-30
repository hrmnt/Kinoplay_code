import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import { signOut } from "../actions/AuthAction";
import { toggleDrawer } from "../actions/SidebarActions";

import { getWidth, getHeight, statusBarHeight } from "../constants";
import play from "../assets/icPlay.png";
import icQr from "../assets/icQr.png";
import icMan from "../assets/icMan.png";
import greenblue from "../assets/greenblue.png";
import red from "../assets/red.png";
import blue from "../assets/blue.png";
import icRateUs from "../assets/icRateUs.png";
import sun from "../assets/sun.png";
import quit from "../assets/quit.png";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StackActions, NavigationActions } from "react-navigation";
import * as Animatable from "react-native-animatable";
const uri =
  "https://s3.amazonaws.com/exp-icon-assets/ExpoEmptyManifest_192.png";

Animatable.initializeRegistryWithDefinitions({
  lefAs: {
    from: {
      left: getWidth(324)
    },
    to: {
      left: 20
    },
    easing: "linear"
  }
});

Animatable.initializeRegistryWithDefinitions({
  rigAs: {
    from: {
      left: 20
    },
    to: {
      left: getWidth(324)
    },
    easing: "linear"
  }
});

class Sidebar extends Component {
  state = {
    animated: false
  };
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.sidebarReducer.toggle) {
      console.log("ASDSasdsadAD");

      // this.hamW.transitionTo({
      //   left:20
      // },5000);
      // this.fL.transitionTo({
      //   transform: [
      //     { rotate: '45deg'},

      //   ],
      // },15000)
      //   if(!this.state.animated){
      //     this.hamW.lefAs(300);
      //     this.setState({
      //       animated:true
      //     })
      //   }
      // }
      // else{
      //   if(this.state.animated){
      //     this.hamW.rigAs(300);
      //     this.setState({
      //       animated:false
      //     })
      //   }
      // this.hamW.transitionTo({
      //   left:getWidth(324)
      // },5000)
    }
  }

  navigateToScreen = route => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  closeDrawer = () => {
    try{
      console.log("Close", this.props.navigation);
      this.props.toggleDrawer();
      if (this.props.sidebarReducer.toggle) {
        this.props.navigation.closeDrawer();
        this.hamW.rigAs(180);
        
  
        this.fL.transitionTo(
          {
            top: 0,
            left: 0,
            width:getWidth(28),
            transform: [{ rotate: "0deg" }]
          },
          180
        );
        this.sL.transitionTo(
          {
            top: getHeight(18),
            left: 0,
            width:getWidth(28),

            transform: [{ rotate: "0deg" }]
  
          },
          180
        );
        this.tL.transitionTo(
          {
            opacity: 1,
  
          },
          180
        );
  
        this.setState({
          animated: false
        });
      } else {
        this.props.navigation.openDrawer();
        this.hamW.lefAs(180);
        this.fL.transitionTo(
          {
            top: 8,
            left: -4,
            width:getWidth(28),
            transform: [{ rotate: "45deg" }]
          },
          180
        );
        this.sL.transitionTo(
          {
            top: 8,
            left: -4,
            width:getWidth(28),

            transform: [{ rotate: "-45deg" }]
          },
          180
        );
        this.tL.transitionTo(
          {
            opacity: 0
          },
          180
        );
        this.setState({
          animated: true
        });
      }
    }
    catch(e){
      console.log(e)
    }
    
  };

  toAuthProfile = () => {
    const { navigation } = this.props;
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: "AuthStack" })]
    });
    navigation.dispatch(resetAction);
  };

  
  errorPress = () => {
    Alert.alert(
      "Предупреждение",
      "На данный момент функция не доступна",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }


  signout = () => {
    this.props.signOut();
  };

  render() {
    const { userReducer } = this.props;
    const { user } = userReducer;
    const { username } = user;
    return (
      <View
        style={[styles.container, { backgroundColor: "rgba(40,42,100,0.75)" }]}
      >
        <SafeAreaView tint="dark" intensity={100} style={[styles.wrap]}>
          {/* <Animatable.View  style={[styles.hWrap, {
            position: "absolute",
            left: getWidth(324),
            top:  -statusBarHeight
          }]} ref={ref => (this.hamW = ref)}>
            <TouchableOpacity style={styles.hWrap}  onPress={this.closeDrawer}>
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
          </Animatable.View> */}
          <TouchableOpacity
            onPress={() => this.navigateToScreen("Home")}
            style={styles.navBtn}
          >
            <Image style={styles.navIcon} source={play} />
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
                  { fontFamily: "SFProDisplay-Bold", fontSize: 17, letterSpacing: 0.5 }
                ]}
              >
                {username}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.errorPress()} style={[styles.navBtn, { marginTop: 10 }]}>
              <Image style={styles.navIcon} source={icQr} />
              <Text style={[styles.navTxt, { letterSpacing: 0.5 }]}>
                Scan & pay
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.firstBtnWrap,{}]}>
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
            <TouchableOpacity onPress={() => this.errorPress()} style={[styles.navBtn, { marginTop: 10 }]}>
              <Image style={styles.navIcon} source={blue} />
              <Text style={[styles.navTxt, { letterSpacing: 0.5 }]}>О нас</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.errorPress()} style={[styles.navBtn, { marginTop: 10 }]}>
              <Image style={styles.navIcon} source={icRateUs} />
              <Text style={[styles.navTxt, { letterSpacing: 0.5 }]}>
                Оцените нас
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.helpWrap}>
            <View style={styles.ssWrap} />
            <TouchableOpacity onPress={() => this.errorPress()} style={[styles.navBtn, { marginTop: 0 }]}>
              <View style={styles.sunWrap}>
                <Image style={styles.sunIcon} source={sun} />
              </View>
              <View style={{ color: "transparent" }}>
                <Text style={[styles.helpTxt]}>Обратная связь</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.errorPress()} style={[styles.navBtn, { marginTop: 10 }]}>
              <View style={styles.sunWrap}>
                <Image style={styles.sunIcon} source={sun} />
              </View>
              <Text style={[styles.helpTxt]}>Как купить</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.errorPress()} style={[styles.navBtn, { marginTop: 10 }]}>
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
      </View>
    );
  }
}

Sidebar.propTypes = {
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopRightRadius: 48,
    borderBottomRightRadius: 48,
    paddingTop: 60 + statusBarHeight,

    // justifyContent: 'center',
    // alignItems: 'center'
  },
  hWrap: {
    width: getHeight(50),
    height: getHeight(50),
    
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
    justifyContent:"space-around",
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
  firstBtnWrap: {
  },
  helpWrap: {
    paddingVertical: 9
  },
  ssWrap: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.1)",
    height: getHeight(142),
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
  },
  notBlurred: {
    ...StyleSheet.absoluteFill,
    top: statusBarHeight
  }
});

const mapStateToProps = ({
  userReducer,
  authReducer,
  sidebarReducer,
  errorsReducer
}) => {
  return { userReducer, authReducer, sidebarReducer, errorsReducer };
};

const mapDispatchToProps = dispatch => ({
  signOut: bindActionCreators(signOut, dispatch),
  toggleDrawer: bindActionCreators(toggleDrawer, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
