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
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard, 
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProfile, updateProfile } from "../../actions/UserActions";
import { TextInputMask } from "react-native-masked-text";
import RNPickerSelect from "react-native-picker-select";
import { getHeight, getWidth } from "../../constants";
import background from "../../assets/background.png";
import upDown from "../../assets/upDown.png";
import icWoman from "../../assets/icWoman.png";
import icMan from "../../assets/silver.png";
import loading from "../../assets/loading.png";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Header } from "../../commons";
import LinearGradient from "react-native-linear-gradient";

import * as Animatable from "react-native-animatable";

const { width } = Dimensions.get("window");
const ages = [
  {
    label: "12",
    value: "12"
  },
  {
    label: "13",
    value: "13"
  },
  {
    label: "14",
    value: "14"
  },
  {
    label: "15",
    value: "15"
  },
  {
    label: "16",
    value: "16"
  },
  {
    label: "17",
    value: "17"
  },
  {
    label: "18",
    value: "18"
  },
  {
    label: "19",
    value: "19"
  },
  {
    label: "20",
    value: "20"
  },
  {
    label: "21",
    value: "21"
  },
  {
    label: "22",
    value: "22"
  },
  {
    label: "23",
    value: "23"
  },
  {
    label: "24",
    value: "24"
  },
  {
    label: "25",
    value: "25"
  },
  {
    label: "26",
    value: "26"
  },
  {
    label: "27",
    value: "27"
  },
  {
    label: "28",
    value: "28"
  },
  {
    label: "29",
    value: "29"
  },
  {
    label: "30",
    value: "30"
  },
  {
    label: "31",
    value: "31"
  },
  {
    label: "32",
    value: "32"
  },
  {
    label: "33",
    value: "33"
  },
  {
    label: "34",
    value: "34"
  },
  {
    label: "35",
    value: "35"
  },
  {
    label: "36",
    value: "36"
  },
  {
    label: "37",
    value: "37"
  },
  {
    label: "38",
    value: "38"
  },
  {
    label: "39",
    value: "39"
  },
  {
    label: "40",
    value: "40"
  },
  {
    label: "41",
    value: "41"
  },
  {
    label: "42",
    value: "42"
  },
  {
    label: "43",
    value: "43"
  },
  {
    label: "44",
    value: "44"
  },
  {
    label: "45",
    value: "45"
  },
  {
    label: "46",
    value: "46"
  },
  {
    label: "47",
    value: "47"
  },
  {
    label: "48",
    value: "48"
  },
  {
    label: "49",
    value: "49"
  },
  {
    label: "50",
    value: "50"
  }
];

const cities = [
  {
    label: "Алматы",
    value: 1
  },
  {
    label: "Шымкент",
    value: 2
  }
];
class EditUser extends Component {
  state = {
    password: "",
    rePassword: "",
    loading: false,
    user: {
      age: null,
      city: null,
      email: "",
      gender: "",
      password: "",
      username: ""
    },
    oldUser:{

    },
    errors: []
  };

  onHamburger = () => {
    console.log("drawer");
    this.props.navigation.openDrawer();
  };

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  componentDidMount() {
    const { user } = this.props.userReducer;
    user.age = String(user.age);
    this.setState({
      user,
      oldUser:user
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const firstWords = [];
    nextProps.errorsReducer.forEach(i => {
      const word = i.substr(0, i.indexOf(" "));
      firstWords.push(word);
    });
    this.setState({
      errors: firstWords
    });
  }

  onSave = () => {
    const { user, password, rePassword } = this.state;
    const { username, email, city, age } = user;
    this.setState({
      loading: true
    });
    console.log("onSave");
    if (password.length > 0) {
      if (password !== rePassword || password.length < 6) {
        this.setState({
          loading: false
        });
        console.log("pas");

        return;
      }
    }
    if (username.length < 4) {
      this.setState({
        loading: false
      });
      console.log("user");

      return;
    }
    if (!this.validateEmail(email)) {
      this.setState({
        loading: false
      });
      console.log("email");

      return;
    }
    if (city === null) {
      this.setState({
        loading: false
      });
      console.log("city");

      return;
    }
    if (age === null) {
      this.setState({
        loading: false
      });
      console.log("age");

      return;
    }
    const useraa = this.state.user;
    useraa.age = Number(user.age);
    if(useraa.username === this.state.oldUser.username){
      delete useraa.username
    }
    if(useraa.email === this.state.oldUser.email){
      delete useraa.email
    }
    delete useraa.phone;
    this.props.updateProfile(useraa);
  };

  goBack = () =>{
    const { navigation } = this.props;
    navigation.navigate("Profile");
  }


  render() {
    const { userReducer } = this.props;
    const { errors } = this.state;
    const { user } = userReducer;
    const { username, statistics } = user;
    const placeholder = {
      label: "Возраст",
      value: null,
      color: "#fff"
    };
    const cityPlaceholder = {
      label: "Город",
      value: null,
      color: "#fff"
    };
    console.log(this.state);

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <TouchableWithoutFeedback
          style={[{ flex: 1 }]}
          onPress={Keyboard.dismiss}
          accessible={false}
        >
          <ImageBackground
            source={background}
            style={{
              flex: 1,
              marginLeft: -1,
              paddingTop: StatusBar.statusBarHeight
            }}
          >
            <KeyboardAwareScrollView
              contentContainerStyle={{
                flex: 1
              }}
            >
              <Header
                headerStyle={{
                  alignItems: "flex-start"
                }}
                navStyle={{
                  marginTop: 5,
                  opacity:1
                }}
                titleStyle={{
                  fontFamily: "SFProDisplay-Regular",
                  fontSize: 18,
                  fontWeight: "400",
                  letterSpacing: 0.12,
                  width: 264
                }}
                onBack={() => this.goBack()}
                title={"Для использования Кинобонусов заполните свой профиль"}
              />
              <View style={styles.pInfo}>
                <Animatable.View
                  style={[styles.inputBorder, 
                    errors.includes("username") ? styles.error: null
                    
                ]}
                  ref={ref => (this.number = ref)}
                >
                  <TextInput
                    onChangeText={username =>
                      this.setState(state => {
                        state.user.username = username;
                        return state;
                      })
                    }
                    value={this.state.user.username}
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#ccc"
                  />
                </Animatable.View>
                <Animatable.View
                  style={[styles.inputBorder,
                    errors.includes("password") ? styles.error: null
                    
                ]}
                  ref={ref => (this.number = ref)}
                >
                  <TextInput
                    onChangeText={password =>
                      this.setState({
                        password
                      })
                    }
                    value={this.state.password}
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="*******"
                    placeholderTextColor="#ccc"
                  />
                </Animatable.View>
                <Animatable.View
                  style={[styles.inputBorder, 
                    errors.includes("rePassword") ? styles.error: null
                
                ]}
                  ref={ref => (this.number = ref)}
                >
                  <TextInput
                    onChangeText={rePassword =>
                      this.setState({
                        rePassword
                      })
                    }
                    value={this.state.rePassword}
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="*******"
                    placeholderTextColor="#ccc"
                  />
                </Animatable.View>
                <Animatable.View
                  style={[styles.inputBorder, 
                    errors.includes("email") ? styles.error: null
                ]}
                  ref={ref => (this.number = ref)}
                >
                  <TextInput
                    onChangeText={email =>
                      this.setState(state => {
                        state.user.email = email.toLowerCase();
                        return state;
                      })
                    }
                    value={this.state.user.email}
                    style={styles.input}
                    placeholder="username@gmail.com"
                    placeholderTextColor="#ccc"
                  />
                </Animatable.View>
                <Animatable.View
                  style={[
                    styles.inputBorder,
                    { justifyContent: "space-between", paddingRight: 5 },
                    errors.includes("age") ? styles.error: null
                  ]}
                  ref={ref => (this.number = ref)}
                >
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    <Image
                      style={styles.upDown}
                      resizeMode="contain"
                      source={upDown}
                    />
                    <RNPickerSelect
                      placeholder={placeholder}
                      items={ages}
                      onValueChange={value => {
                        this.setState(state => {
                          state.user.age = value;
                          return state;
                        });
                      }}
                      onUpArrow={() => {
                        this.inputRefs.firstTextInput.focus();
                      }}
                      onDownArrow={() => {
                        this.inputRefs.favSport1.togglePicker();
                      }}
                      style={{
                        ...pickerSelectStyles,
                        iconContainer: {
                          top: 20,
                          right: 10
                        }
                      }}
                      value={this.state.user.age}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      const { gender } = this.state.user;
                      if (gender === "MALE") {
                        this.setState(state => {
                          state.user.gender = "FEMALE";
                          return state;
                        });
                      } else {
                        this.setState(state => {
                          state.user.gender = "MALE";
                          return state;
                        });
                      }
                    }}
                    style={styles.genderWrap}
                  >
                    {this.state.user.gender !== "MALE" ? (
                      <Image style={styles.gender} source={icWoman} />
                    ) : (
                      <Image style={styles.gender} source={icMan} />
                    )}
                  </TouchableOpacity>
                </Animatable.View>
                <Animatable.View
                  style={[
                    styles.inputBorder,
                    { justifyContent: "space-between", paddingRight: 5 },
                    errors.includes("city")
                  ]}
                  ref={ref => (this.number = ref)}
                >
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    <Image
                      style={styles.upDown}
                      resizeMode="contain"
                      source={upDown}
                    />
                    <RNPickerSelect
                      placeholder={cityPlaceholder}
                      items={cities}
                      onValueChange={value => {
                        this.setState(state => {
                          state.user.city = value;
                          return state;
                        });
                      }}
                      onUpArrow={() => {
                        this.inputRefs.firstTextInput.focus();
                      }}
                      onDownArrow={() => {
                        this.inputRefs.favSport1.togglePicker();
                      }}
                      style={{
                        ...pickerSelectStyles,
                        iconContainer: {
                          top: 20,
                          right: 10
                        }
                      }}
                      value={this.state.user.city}
                    />
                  </View>
                </Animatable.View>
              </View>
              <Animatable.View ref={ref => (this.getCodeBtn = ref)}>
                <LinearGradient
                  start={[0.8, 0.2]}
                  style={styles.btnFill}
                  colors={["rgb(255,54,165)", "rgb(190,56,255)"]}
                >
                  <TouchableOpacity
                    onPress={() => this.onSave()}
                    style={styles.btnFill}
                  >
                    {this.state.loading && (
                      <Animatable.Image
                        animation="rotate"
                        iterationCount="infinite"
                        easing="ease-in-out-quad"
                        style={styles.loading}
                        source={loading}
                      />
                    )}

                    <Text style={styles.btnT}>СОХРАНИТЬ</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </Animatable.View>
            </KeyboardAwareScrollView>
          </ImageBackground>
        </TouchableWithoutFeedback>
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
    width: width - 80,
    flexDirection: "row",
    alignItems: "center"
  },
  error: {
    borderColor: "#ff1f1f"
  },
  input: {
    flex: 1,
    color: "#fff",
    fontFamily: "SFProDisplay-Regular",
    fontSize: 14,
    fontWeight: "600"
  },
  upDown: {
    width: 12,
    height: 20,
    marginRight: 15
  },
  genderWrap: {
    width: 44,
    height: 44,
    backgroundColor: "rgba(255,255,255,0.27)",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center"
  },
  gender: {
    width: 31,
    height: 31
  },
  btnFill: {
    alignSelf: "center",
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 27,
    width: width - 80,
    flexDirection: "row"
  },

  btnT: {
    fontSize: 12,
    color: "#fff",
    letterSpacing: 0.5,
    lineHeight: 14,
    fontFamily: "SFProDisplay-Semibold"
  },
  loading: {
    height: 22,
    width: 22,
    marginRight: 10
  }
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    alignSelf: "center",
    width: "100%"
  },
  inputAndroid: {
    fontSize: 14,
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  }
});

const mapStateToProps = ({ userReducer, errorsReducer }) => {
  return { userReducer, errorsReducer };
};

const mapDispatchToProps = dispatch => ({
  getProfile: bindActionCreators(getProfile, dispatch),
  updateProfile: bindActionCreators(updateProfile, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);
