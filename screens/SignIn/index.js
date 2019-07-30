import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  StatusBar,
  Alert
} from "react-native";
import background from "../../assets/background.png";
import logo from "../../assets/logo.png";
import logoFlip from "../../assets/logoFilp.png";
import xButton from "../../assets/xButton.png";
import FlipCard from "react-native-flip-card";
import { TextInputMask } from "react-native-masked-text";
import LinearGradient from "react-native-linear-gradient";

import { StackActions, NavigationActions } from "react-navigation";

import * as Animatable from "react-native-animatable";

import BackBtn from "../../commons/BackBtn";

let { height, width } = Dimensions.get("window");

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { signUp, signIn } from "../../actions/AuthAction";

Animatable.initializeRegistryWithDefinitions({
  bgFadeDowns: {
    from: {
      height: height * 0.6,
      borderBottomLeftRadius: width / 2,
      borderBottomRightRadius: width / 2
    },
    to: {
      height: height,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    }
  }
});

Animatable.initializeRegistryWithDefinitions({
  upToTopfirst: {
    from: {
      bottom: -124
    },
    to: {
      bottom: 89
    }
  }
});
Animatable.initializeRegistryWithDefinitions({
  downToTopfirst: {
    from: {
      bottom: 89
    },
    to: {
      bottom: -124
    }
  }
});

Animatable.initializeRegistryWithDefinitions({
  upToTopsecond: {
    from: {
      bottom: -154
    },
    to: {
      bottom: 35
    }
  }
});
Animatable.initializeRegistryWithDefinitions({
  downToTopsecond: {
    from: {
      bottom: 35
    },
    to: {
      bottom: -154
    }
  }
});

Animatable.initializeRegistryWithDefinitions({
  bgFadeUp: {
    from: {
      height: height,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    to: {
      height: height * 0.6,
      borderBottomLeftRadius: width / 2,
      borderBottomRightRadius: width / 2
    }
  }
});



class SignIn extends Component {
  state = {
    keyboard: false,
    faded: false,
    imageMt: new Animated.Value(0),
    scrollX: new Animated.Value(0),
    flip: false,
    loaded: false,
    phone: "",
    code: "",
    username: "",
    phoneError: false,
    height: 0,
    scroll: false
  };

  async componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
    setTimeout(() => {
      this.setState({
        loaded: true
      });
      this.firstAnimation();
    }, 1000);
  }

  _keyboardDidShow = async e => {
    console.log(e);
    if (!this.state.keyboard) {
      this.upDataWrap(e.endCoordinates.height);
      this.setState({
        height: e.endCoordinates.height
      });
      this.background.transition(
        {
          height: height * 0.6
        },
        {
          height: height * 0.9
        }
      );
      this.bgImage.transition(
        {
          height: height * 0.6
        },
        {
          height: height * 0.9
        }
      );
      this.btn.transition(
        {
          bottom: height - height * 0.6 - 30
        },
        {
          bottom: height - height * 0.9 - 30
        },
        1000
      );
      this.flipimage.transitionTo({
        height: 74
      });
      this.setState({
        keyboard: true
      });
    }
  };

  _keyboardDidHide = async e => {
    this.setState({
      keyboard: false
    });
  };

  componentWillReceiveProps(nextProps) {
    console.log("REVE");
    console.log(nextProps);
    if (nextProps.authReducer.username !== undefined) {
      console.log(nextProps.authReducer.username);
      if (!this.state.scroll) {
        this.slideAnimation();
      }
    } else {
      Alert.alert(
        "Ошибка",
        "Введенный вами номер телефона не верный",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  }

  firstAnimation = () => {
    this.signInBtn.upToTopfirst(1000);
    this.policy.upToTopsecond(1200);
  };

  hideLoginBox = () => {
    this.signInBtn.downToTopfirst(1000);
    this.policy.downToTopsecond(1200);
  };

  onSignIn = async () => {
    this.setState({
      flip: true
    });
    await this.hideLoginBox();
    setTimeout(() => {
      this.showDataWrap();
      this.background.bgFadeUp(1000);
      this.bgImage.bgFadeUp(1000);
      this.btn.transition(
        {
          bottom: -130
        },
        {
          bottom: height - height * 0.6 - 30
        },
        1000
      );
    }, 1000);
  };

  showDataWrap = () => {
    this.number.transitionTo(
      {
        bottom: 89
      },
      1000
    );
    this.getCodeBtn.transitionTo(
      {
        bottom: 35
      },
      1200
    );

    this.code.transitionTo(
      {
        bottom: 89
      },
      1000
    );
    this.okBtn.transitionTo(
      {
        bottom: 35
      },
      1200
    );
    this.reCode.transitionTo(
      {
        bottom: 89
      },
      1200
    );
  };

  upDataWrap = height => {
    console.log("height", height);
    console.log("UPDATAWRAP");
    this.number.transitionTo({
      bottom: height + 114
    });
    this.getCodeBtn.transitionTo({
      bottom: height + 114 - 35 - 20
    });

    this.code.transitionTo({
      bottom: height + 114
    });
    this.okBtn.transitionTo({
      bottom: height + 114 - 35 - 20
    });
    this.reCode.transitionTo({
      bottom: height + 54 + 54 - 80
    });
    this.username.transitionTo({
      bottom: height + 114
    });
    this.goBtn.transitionTo({
      bottom: height + 114 - 35 - 20
    });

    setTimeout(() => {
      this.sendCodeT.transitionTo(
        {
          bottom: this.state.height + 114 + 94
        },
        500
      );
    }, 1300);
  };

  downDataWrap = () => {
    this.sendCodeT.transitionTo(
      {
        opacity: 0
      },
      100
    );
    this.number.transitionTo(
      {
        opacity: 0
      },
      100
    );
    this.getCodeBtn.transitionTo(
      {
        opacity: 0
      },
      100
    );

    this.code.transitionTo(
      {
        opacity: 0
      },
      100
    );
    this.okBtn.transitionTo(
      {
        opacity: 0
      },
      100
    );
    this.reCode.transitionTo(
      {
        opacity: 0
      },
      100
    );
    setTimeout(() => {
      this.sendCodeT.transitionTo({
        bottom: -134
      });
      this.number.transitionTo({
        bottom: -134
      });
      this.getCodeBtn.transitionTo({
        bottom: -154
      });

      this.code.transitionTo({
        bottom: -134
      });
      this.okBtn.transitionTo({
        bottom: -154
      });
      this.reCode.transitionTo({
        bottom: -174
      });
    }, 400);
    setTimeout(() => {
      this.number.transitionTo(
        {
          opacity: 1
        },
        100
      );
      this.getCodeBtn.transitionTo(
        {
          opacity: 1
        },
        100
      );

      this.code.transitionTo(
        {
          opacity: 1
        },
        100
      );
      this.okBtn.transitionTo(
        {
          opacity: 1
        },
        100
      );
      this.reCode.transitionTo(
        {
          opacity: 1
        },
        100
      );
    }, 800);
  };

  backToSignIn = async () => {
    this.setState({
      flip: false,
      scroll: false,
      phone: "",
      code: "",
      username: ""
    });
    this.downDataWrap();
    await this.background.bgFadeDowns(1000)
     this.bgImage.bgFadeDowns(1000)
    this.btn.transitionTo(
      {
        bottom: -130
      },
      1250
    );
    this.unSlideAnimation();
    setTimeout(() => {
      this.firstAnimation();
      this.btn.transitionTo(
        {
          opacity: 1
        },
        100
      );
    }, 1000);
  };

  unSlideAnimation = () => {
    this.setState({
      scroll: false
    });
    this.number.transitionTo(
      {
        left: 40
      },
      1000
    );
    this.getCodeBtn.transitionTo(
      {
        left: 40
      },
      1200
    );

    this.code.transitionTo(
      {
        right: -width
      },
      1000
    );
    this.okBtn.transitionTo(
      {
        right: -width
      },
      1200
    );
    this.reCode.transitionTo(
      {
        right: -width
      },
      1200
    );
  };

  slideAnimation = () => {
    this.setState({
      scroll: true
    });
    this.number.transitionTo(
      {
        left: -width
      },
      1000
    );
    this.getCodeBtn.transitionTo(
      {
        left: -width
      },
      1200
    );

    this.code.transitionTo(
      {
        right: 40
      },
      1000
    );
    this.okBtn.transitionTo(
      {
        right: 40
      },
      1200
    );
    this.reCode.transitionTo(
      {
        right: 40
      },
      1200
    );
    setTimeout(() => {
      this.sendCodeT.transitionTo(
        {
          opacity: 1
        },
        500
      );
    }, 1300);
  };

  slideAnimationCode = () => {
    this.sendCodeT.transitionTo(
      {
        opacity: 0
      },
      500
    );
    this.code.transitionTo(
      {
        right: width
      },
      1000
    );
    this.okBtn.transitionTo(
      {
        right: width
      },
      1200
    );
    this.reCode.transitionTo(
      {
        right: width
      },
      1200
    );
    this.username.transitionTo(
      {
        right: 40
      },
      1000
    );
    this.goBtn.transitionTo(
      {
        right: 40
      },
      1200
    );
  };

  getCode = () => {
    let phone = this.state.phone.replace(/[^A-Z0-9]+/gi, "");
    if (phone.length > 8) {
      const plus = "+";
      phone = plus.concat(phone);
      console.log(phone);
      const data = {
        phone
      };
      this.props.signUp(data);
    } else {
      this.setState({
        phoneError: true
      });
      Alert.alert(
        "Ошибка",
        "Введенный вами номер телефона не верный",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  sendCode = () => {
    if (this.state.code !== "7777") {
      Alert.alert(
        "Ошибка",
        "Введенный вами код не верный",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      return;
    }
    if (this.props.authReducer.username === null) {
      this.slideAnimationCode();
    }
    if (this.props.authReducer.username !== null) {
      if (this.props.authReducer.username.length > 0) {
        let phone = this.state.phone.replace(/[^A-Z0-9]+/gi, "");
        const plus = "+";
        phone = plus.concat(phone);
        const user = {
          phone,
          code: this.state.code
        };
        this.props.signIn(user);
        setTimeout(() => {
          this.toMainProfile();
        }, 600);
      }
    }
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

  register = () => {
    let phone = this.state.phone.replace(/[^A-Z0-9]+/gi, "");
    const plus = "+";
    phone = plus.concat(phone);
    const user = {
      phone,
      code: this.state.code,
      username: this.state.username
    };
    this.props.signIn(user);
    setTimeout(() => {
      this.toMainProfile();
    }, 600);
  };

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#282a64" }}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          {/* Background */}
          <Animatable.View
            style={{
              width: "100%",
              height: height,
              position: "absolute",
              left: 0,
              top: 0,
              overflow: "hidden"
            }}
            ref={ref => (this.background = ref)}
          >
            <Animatable.Image
              ref={ref => (this.bgImage = ref)}
              source={background}
              style={{ width: "100%", height: "100%" }}
            />
          </Animatable.View>

          <TouchableWithoutFeedback
            style={[
              this.state.loaded ? { opacity: 1 } : { opacity: 0 },
              { flex: 1 }
            ]}
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <SafeAreaView
              style={{ flex: 1, marginTop: 20, position: "relative" }}
            >
              {/* X Button */}
              <Animatable.View
                ref={ref => (this.btn = ref)}
                style={{
                  bottom: -130,
                  position: "absolute",
                  alignSelf: "center",
                  marginTop: -30,
                  zIndex: 9999
                }}
              >
                <TouchableOpacity onPress={() => this.backToSignIn()}>
                  <Image
                    style={{
                      height: 60,
                      width: 60,
                      alignSelf: "center"
                    }}
                    source={xButton}
                  />
                </TouchableOpacity>
              </Animatable.View>
              {this.state.faded && (
                <BackBtn onPress={() => this.backToSignIn()} />
              )}

              {/* LoginBtn & Policy */}
              <Animatable.View
                // easing={"ease-in-out"}
                // duration={1200}
                // animation={"fadeInUp"}
                style={{
                  bottom: -124,
                  position: "absolute",
                  alignSelf: "center",
                  zIndex: 100
                }}
                ref={ref => (this.signInBtn = ref)}
              >
                <LinearGradient
                  useAngle
                  angle={90}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.btnFill}
                  colors={["rgb(255,54,165)", "rgb(190,56,255)"]}
                >
                  <TouchableOpacity
                    onPress={() => this.onSignIn()}
                    style={styles.btnFill}
                  >
                    <Text style={styles.btnT}>ВОЙТИ</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </Animatable.View>
              <Animatable.View
                style={{
                  flexDirection: "row",
                  width: width - 80,
                  flexWrap: "wrap",
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  bottom: -154,
                  zIndex: 4
                }}
                ref={ref => (this.policy = ref)}
                // easing={"ease-in-out"}
                // duration={1400}
                // animation={"fadeInUp"}
              >
                <Text style={styles.confidental}>
                  Продолжая вы соглашаетесь с политикой конфиденциальности и
                  правилами использования
                </Text>
              </Animatable.View>
              {/* ------------ */}

              {/* Number & Code */}
              <Animatable.View
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  bottom: -134,
                  zIndex: 100
                }}
                ref={ref => (this.number = ref)}
              >
                <TextInputMask
                  type={"custom"}
                  options={{
                    mask: "+7 (999) 999-99-99"
                  }}
                  value={this.state.phone}
                  onChangeText={phone => {
                    this.setState({
                      phone
                    });
                  }}
                  placeholder="ВВЕДИТЕ НОМЕР"
                  placeholderTextColor="#ccc"
                  keyboardType={"numeric"}
                  style={[
                    styles.inputBorder,
                    this.state.phoneError ? styles.errorBorder : null
                  ]}
                />
              </Animatable.View>
              <Animatable.View
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  bottom: -134,
                  zIndex: 100
                }}
                ref={ref => (this.getCodeBtn = ref)}
              >
                <LinearGradient
                  start={[0.8, 0.2]}
                  style={styles.btnFill}
                  colors={["rgb(255,54,165)", "rgb(190,56,255)"]}
                >
                  <TouchableOpacity
                    onPress={() => this.getCode()}
                    style={styles.btnFill}
                  >
                    <Text style={styles.btnT}>ПОЛУЧИТЬ КОД</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </Animatable.View>
              <Animatable.View
                style={{
                  position: "absolute",
                  paddingHorizontal: 36,
                  width: width - 80,
                  opacity: 0,
                  bottom: -134,
                  zIndex: 100
                }}
                ref={ref => (this.sendCodeT = ref)}
              >
                <Text
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "SFProDisplay-Regular",
                    fontSize: 12,
                    fontWeight: "400",
                    letterSpacing: 0.08,
                    lineHeight: 18
                  }}
                >
                  Код отправлен
                </Text>
                <View>
                  <Text>
                    <Text
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontFamily: "SFProDisplay-Regular",
                        fontSize: 12,
                        fontWeight: "400",
                        letterSpacing: 0.08,
                        lineHeight: 18
                      }}
                    >
                      Срок истекает через:
                    </Text>
                  </Text>
                </View>
              </Animatable.View>
              <Animatable.View
                style={{
                  position: "absolute",
                  right: -width,
                  bottom: -134,
                  zIndex: 100
                }}
                ref={ref => (this.code = ref)}
              >
                <TextInput
                  value={this.state.code}
                  onChangeText={code => this.setState({ code })}
                  placeholderTextColor={"#ccc"}
                  keyboardType="numeric"
                  style={[styles.inputBorder, { zIndex: 100 }]}
                  placeholder="ВВЕДИТЕ КОД"
                />
              </Animatable.View>
              <Animatable.View
                style={{
                  position: "absolute",
                  right: -width,
                  bottom: -154,
                  zIndex: 100
                }}
                ref={ref => (this.okBtn = ref)}
              >
                <LinearGradient
                  start={[0.8, 0.2]}
                  style={styles.btnFill}
                  colors={["rgb(255,54,165)", "rgb(190,56,255)"]}
                >
                  <TouchableOpacity
                    onPress={() => this.sendCode()}
                    style={styles.btnFill}
                  >
                    <Text style={styles.btnT}>ОК</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </Animatable.View>
              <Animatable.View
                style={[
                  styles.reCode,
                  {
                    position: "absolute",
                    right: -width,
                    bottom: -54 - 54 - 60,
                    zIndex: 100
                  }
                ]}
                ref={ref => (this.reCode = ref)}
              >
                <TouchableOpacity>
                  <Text style={styles.reCode}>Запросить код еще раз</Text>
                </TouchableOpacity>
              </Animatable.View>

              <Animatable.View
                style={{
                  position: "absolute",
                  right: -width,
                  bottom: -134,
                  zIndex: 100
                }}
                ref={ref => (this.username = ref)}
              >
                <TextInput
                  value={this.state.username}
                  onChangeText={username => this.setState({ username })}
                  placeholderTextColor={"#ccc"}
                  style={[styles.inputBorder, { zIndex: 100 }]}
                  placeholder="username"
                />
              </Animatable.View>
              <Animatable.View
                style={{
                  position: "absolute",
                  right: -width,
                  bottom: -154,
                  zIndex: 100
                }}
                ref={ref => (this.goBtn = ref)}
              >
                <LinearGradient
                  start={[0.8, 0.2]}
                  style={styles.btnFill}
                  colors={["rgb(255,54,165)", "rgb(190,56,255)"]}
                >
                  <TouchableOpacity
                    onPress={() => this.register()}
                    style={styles.btnFill}
                  >
                    <Text style={styles.btnT}>ПОЕХАЛИ</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </Animatable.View>
              {/* ------------- */}

              <Animatable.View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
                ref={ref => (this.wrap = ref)}
              >
                {/* logo box */}
                <Animatable.View
                  ref={ref => (this.flipCardBox = ref)}
                  style={{ position: "absolute", top: 70, zIndex: 99 }}
                >
                  <FlipCard
                    friction={6}
                    perspective={1000}
                    flipHorizontal={false}
                    flip={this.state.flip}
                    clickable={false}
                    flipVertical={true}
                    style={styles.cardContainer}
                    ref={card => (this.card = card)}
                  >
                    <View style={{ height: 140 }}>
                      <Animatable.Image
                        resizeMode="contain"
                        style={[styles.logo]}
                        source={logo}
                      />
                    </View>

                    <View style={{ height: 140 }}>
                      <Animatable.Image
                        ref={ref => (this.flipimage = ref)}
                        resizeMode="contain"
                        style={[styles.logo]}
                        source={logoFlip}
                      />
                    </View>
                  </FlipCard>
                </Animatable.View>
              </Animatable.View>

              {/* -------------------- */}

              {/* <Animated.View
          style={{
            flex: 1,
            paddingTop: height * 0.2,
            paddingBottom: height * 0.11,
            position: "relative",
            justifyContent: "space-between"
          }}
        >
         
          <Animated.View style={{ marginTop: scrollAnim3 }}>
            <ScrollView
              scrollEnabled={true}
              horizontal={true}
              pagingEnabled={true}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              ref={ref => (this.scrollView = ref)}
            >
              <Animated.View style={[styles.scrollwidth]}>
                <Animated.View>
                  <TextInput
                    placeholderTextColor="#ccc"
                    keyboardType="numeric"
                    style={styles.inputBorder}
                    placeholder="ВВЕДИТЕ НОМЕР"
                  />
                </Animated.View>
                <Animated.View style={{ marginTop: scrollAnim4 }}>
                  <LinearGradient
                    start={[0.8, 0.2]}
                    style={styles.btnFill}
                    colors={["rgb(255,54,165)", "rgb(190,56,255)"]}
                  >
                    <TouchableOpacity
                      onPress={() => this.getCode()}
                      style={styles.btnFill}
                    >
                      <Text style={styles.btnT}>ПОЛУЧИТЬ КОД</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </Animated.View>
              </Animated.View>
              <View style={styles.scrollwidth}>
                <Animated.View>
                  <TextInput
                    placeholderTextColor={"#ccc"}
                    keyboardType="numeric"
                    style={styles.inputBorder}
                    placeholder="ВВЕДИТЕ КОД"
                  />
                </Animated.View>
                <Animated.View style={{ marginTop: scrollAnim4 }}>
                  <LinearGradient
                    start={[0.8, 0.2]}
                    style={styles.btnFill}
                    colors={["rgb(255,54,165)", "rgb(190,56,255)"]}
                  >
                    <TouchableOpacity
                      onPress={() => this.toMainProfile()}
                      style={styles.btnFill}
                    >
                      <Text style={styles.btnT}>ОК</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </Animated.View>
              </View>
            </ScrollView>
          </Animated.View>
        </Animated.View> */}
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 140,
    width: 120,
    marginBottom: 186,
    alignSelf: "center"
  },

  btnBorder: {
    alignSelf: "center",
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "rgb(190,56,255)",
    width: "100%",
    borderRadius: 27,
    marginBottom: 20
  },
  reCode: {
    color: "#fff",
    fontFamily: "SFProDisplay-Regular",
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0.08,
    lineHeight: 18,
    width: width - 80,
    textAlign: "center"
  },
  inputBorder: {
    alignSelf: "center",
    height: 54,
    paddingHorizontal: 26,
    fontSize: 12,
    letterSpacing: 1,
    color: "#fff",
    borderWidth: 1.5,
    borderColor: "rgb(190,56,255)",
    borderRadius: 27,
    marginBottom: 20,
    width: width - 80
  },
  errorBorder: {
    borderColor: "#ff1f1f"
  },
  btnT: {
    fontSize: 12,
    color: "#fff",
    letterSpacing: 0.5,
    lineHeight: 14,
    fontFamily: "SFProDisplay-Semibold"
  },
  btnFill: {
    alignSelf: "center",
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 27,
    width: width - 80
  },
  scrollwidth: {
    width: width
  },
  confidental: {
    marginTop: 20,
    textAlign: "center",
    color: "#fff",
    fontFamily: "SFProDisplay-Regular",
    fontSize: 12,
    letterSpacing: 0.08
  },
  cardContainer: {
    zIndex: 999999,
    height: 140
  },
  card: {
    width: 80,
    height: 80,
    zIndex: 9999
  }
});
const mapStateToProps = ({ authReducer, errorsReducer }) => {
  return { authReducer, errorsReducer };
};

const mapDispatchToProps = dispatch => ({
  signUp: bindActionCreators(signUp, dispatch),
  signIn: bindActionCreators(signIn, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
