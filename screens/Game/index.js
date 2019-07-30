import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView as SF,
  Animated,
  Dimensions,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-navigation";
import background from "../../assets/backgroundClear.png";
import LinearGradient from "react-native-linear-gradient";

import { GameHeader } from "../../commons";

import * as Animatable from "react-native-animatable";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";

import { connect } from "react-redux";
import { getHeight, getWidth } from "../../constants";
import Loading from "../Loading";

const barWidth = Dimensions.get("screen").width - 40;
const right = width - barWidth - 20;
const ls = width - barWidth;

const { width } = Dimensions.get("window");
Animatable.initializeRegistryWithDefinitions({
  textFlex: {
    from: {
      left: width
    },
    to: {
      left: 20
    }
  }
});
Animatable.initializeRegistryWithDefinitions({
  textUnFlex: {
    from: {
      left: 20
    },
    to: {
      left: -width
    }
  }
});
class Game extends Component {
  state = {
    start: false,
    selected: {},
    secondGrad: "transparent",
    firstGrad: "transparent",
    number: 0,
    pressed: false,
    ansg: false
  };

  componentWillReceiveProps(nextProps) {
    const { gameReducer } = this.props;
    const { question } = gameReducer;
    let q;
    let indexOf;
    switch (nextProps.gameReducer.toggle) {
      case "GAME_STARTED": {
        if (this.state.animated !== "GAME_STARTED") {
          q = this.props.questions.find(
            item => item._id === nextProps.gameReducer.question.question._id
          );
          indexOf = this.props.questions.indexOf(q);
          this.setState({
            animated: "GAME_STARTED",
            selected: "",
            ansg: false,
            pressed: false
          });

          if (indexOf !== 0) {
            this.nextStep();
            this.hideQuestion(indexOf - 1);
          }
          this.nextQuestion(indexOf);
          this["timeLine"].transition(
            {
              width: barWidth
            },
            {
              width: 0
            },
            this.props.question.questionTimeout +
              this.props.question.pauseTimeout,
            "linear"
          );
        }

        break;
      }
      case "BUTTON_PRESSED": {
        if (this.state.animated !== "BUTTON_PRESSED") {
          this.setState({
            animated: "BUTTON_PRESSED"
          });
          // this.hideButtons();
        }
        break;
      }
      case "ANSWER_GETTED": {
        if (
          this.state.animated !== "ANSWER_GETTED" &&
          this.state.ansg === false
        ) {
          this.setState({
            animated: "ANSWER_GETTED",
            number: indexOf,
            ansg: true
          });
          // this["timeLine"].transitionTo(
          //   {
          //     width: barWidth
          //   },
          //   3000
          // );
        }
        break;
      }
      default:
        break;
    }
  }

  showRightAnswer = () => {
    const r_id = this.props.rightAnswer;
  };

  nextQuestion = index => {
    const tet = this;
    try {
      this["title" + index].textFlex(500);
    } catch (e) {
      console.log(e);
    }
  };
  hideQuestion = index => {
    try {
      this["title" + index].textUnFlex(500);
    } catch (e) {
      console.log(e);
    }
  };

  _renderItem = ({ item, index }) => {
    console.log(item);
    return (
      <View style={styles.slide}>
        <Image source={{ uri: item.link }} style={styles.slideImage} />
      </View>
    );
  };
  onBack = () => {
    this.props.onBack();
  };

  nextStep = () => {
    this._carousel.snapToNext(true, true);
  };

  selectAnswer = question => {
    if (this.state.pressed) {
      console.log("2");

      return;
    } else if (question._id === this.state.selected._id) {
      console.log("1");
      return;
    } else {
      console.log("3");

      this.props.onSelect(question);
      this.setState({
        selected: question,
        pressed: true
      });
    }
  };

  render() {
    const { gameReducer } = this.props;
    const { toggle, question, questions } = gameReducer;
    return (
      <View style={styles.container}>
        <SF style={styles.safeHeader} />
        {this.props.loading && <Loading />}
        <StatusBar barStyle="light-content" />
        <Animated.View
          style={{
            width: "120%",
            height: "110%",
            position: "absolute",
            left: -10,
            top: 0,
            overflow: "hidden"
          }}
        >
          <Animated.Image
            source={background}
            style={{ width: "90%", height: "100%" }}
          />
        </Animated.View>
        <SafeAreaView
          forceInset={{ bottom: "never" }}
          style={styles.wrapContainer}
        >
          <Animatable.View style={{ flex: 1 }}>
            <GameHeader user={this.props.user} />
            <View style={{ marginBottom: 40 }}>
              <Animatable.View
                style={{
                  opacity: 1,
                  width: barWidth,
                  height: 6,
                  borderRadius: 10,
                  backgroundColor: "#ffd002",
                  marginHorizontal: 20,
                  zIndex: 1
                }}
                ref={ref => (this["timeLine"] = ref)}
              />
              <Animatable.View
                style={{
                  opacity: 1,
                  width: barWidth,
                  height: 6,
                  position: "absolute",
                  backgroundColor: "rgba(255,255,255,0.5)",
                  borderRadius: 10,
                  // backgroundColor: "#ffd002",
                  marginHorizontal: 20
                }}
              />
            </View>
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={this.props.questions}
              renderItem={this._renderItem}
              sliderWidth={width}
              itemWidth={220}
            />
            {this.props.questions.map((item, index) => {
              return (
                <Animatable.View
                  style={{
                    position: "absolute",
                    left: barWidth + 40,
                    top: getHeight(520),
                    width: barWidth
                  }}
                  ref={ref => (this["title" + index] = ref)}
                >
                  <Text style={styles.title}>{item && item.text}</Text>
                </Animatable.View>
              );
            })}
            <View style={styles.pList}>
              <View
                style={{
                  position: "absolute",
                  bottom: getHeight(80),
                  alignItems: "center",
                  width: width,
                  paddingHorizontal: 54
                }}
              >
                <View style={styles.btnWrap}>
                  <Animatable.View ref={ref => (this["ref1"] = ref)}>
                    {question.question ? (
                      this.props.rightAnswer &&
                      this.props.rightAnswer._id ===
                        question.question.answers[0]._id ? (
                        <LinearGradient
                          start={{ x: 0.0, y: 0.1 }}
                          end={{ x: 1.9, y: 1.8 }}
                          locations={[0, 0.6]}
                          style={[styles.btnsWrap]}
                          colors={["rgb(0,102,229)", "rgb(13,224,120)"]}
                        >
                          <TouchableOpacity
                            style={[styles.answerBtn]}
                            onPress={() =>
                              this.selectAnswer(question.question.answers[0])
                            }
                          >
                            <Text style={[styles.yesTxt, { color: "#fff" }]}>
                              {question.question &&
                                question.question.answers[0].text}
                            </Text>
                          </TouchableOpacity>
                        </LinearGradient>
                      ) : (
                        <LinearGradient
                          start={{ x: 0.0, y: 0.1 }}
                          end={{ x: 1.9, y: 1.8 }}
                          locations={[0, 0.6]}
                          style={[styles.btnsWrap]}
                          colors={
                            this.props.rightAnswer &&
                            this.props.rightAnswer._id ===
                              question.question.answers[0]._id
                              ? ["rgb(0,102,229)", "rgb(13,224,120)"]
                              : ["transparent", "transparent"]
                          }
                        >
                          <TouchableOpacity
                            style={[
                              styles.noBtn,
                              this.state.selected._id ===
                              question.question.answers[0]._id
                                ? styles.borderSelect
                                : null
                            ]}
                            onPress={() =>
                              this.selectAnswer(question.question.answers[0])
                            }
                          >
                            <Text
                              style={[
                                styles.yesTxt,
                                this.state.selected._id ===
                                question.question.answers[0]._id
                                  ? { color: "#fff" }
                                  : null
                              ]}
                            >
                              {question.question &&
                                question.question.answers[0].text}
                            </Text>
                          </TouchableOpacity>
                        </LinearGradient>
                      )
                    ) : null}
                  </Animatable.View>
                  <Animatable.View ref={ref => (this["ref1"] = ref)}>
                    {question.question ? (
                      this.props.rightAnswer &&
                      this.props.rightAnswer._id ===
                        question.question.answers[1]._id ? (
                        <LinearGradient
                          start={{ x: 0.0, y: 0.1 }}
                          end={{ x: 1.9, y: 1.8 }}
                          locations={[0, 0.6]}
                          style={[styles.btnsWrap]}
                          colors={["rgb(0,102,229)", "rgb(13,224,120)"]}
                        >
                          <TouchableOpacity
                            style={[styles.answerBtn]}
                            onPress={() =>
                              this.selectAnswer(question.question.answers[1])
                            }
                          >
                            <Text style={[styles.yesTxt, { color: "#fff" }]}>
                              {question.question.answers[1].text}
                            </Text>
                          </TouchableOpacity>
                        </LinearGradient>
                      ) : (
                        <LinearGradient
                          start={{ x: 0.0, y: 0.1 }}
                          end={{ x: 1.9, y: 1.8 }}
                          locations={[0, 0.6]}
                          style={[styles.btnsWrap]}
                          colors={
                            this.props.rightAnswer &&
                            this.props.rightAnswer._id ===
                              question.question.answers[1]._id
                              ? ["rgb(0,102,229)", "rgb(13,224,120)"]
                              : ["transparent", "transparent"]
                          }
                        >
                          <TouchableOpacity
                            style={[
                              styles.noBtn,
                              this.state.selected._id ===
                              question.question.answers[1]._id
                                ? styles.borderSelect
                                : null
                            ]}
                            onPress={() =>
                              this.selectAnswer(question.question.answers[1])
                            }
                          >
                            <Text
                              style={[
                                styles.yesTxt,
                                this.state.selected._id ===
                                question.question.answers[1]._id
                                  ? { color: "#fff" }
                                  : null
                              ]}
                            >
                              {question.question.answers[1].text}
                            </Text>
                          </TouchableOpacity>
                        </LinearGradient>
                      )
                    ) : null}
                  </Animatable.View>
                  {/* {this.renderNoBtn()} */}
                </View>
              </View>
            </View>
          </Animatable.View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
  safeHeader: {
    flex: 0,
    backgroundColor: "rgb(21,22,65)"
  },
  header: {
    backgroundColor: "rgb(21,22,65)"
  },
  wrapContainer: {
    flex: 1
  },
  pList: {
    flex: 1,
    position: "relative"
  },
  slide: {
    height: getHeight(350)
  },
  slideImage: {
    height: getHeight(350),
    width: "100%",
    borderRadius: 20
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: getHeight(24),
    fontFamily: "Gilroy-Bold",
    textAlign: "center"
  },
  btnWrap: {
    width: width,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40
  },
  yesBtn: {
    // paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 24,
    borderColor: "rgb(31,213,255)"
  },
  btnsWrap: {
    width: getWidth(107),
    height: getWidth(54),
    borderRadius: getWidth(20)
  },
  noBtn: {
    width: getWidth(107),
    height: getWidth(54),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: getWidth(20),
    backgroundColor: "#fff"
  },
  answerBtn: {
    width: getWidth(107),
    height: getWidth(54),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: getWidth(20)
  },
  borderSelect: {
    borderWidth: 1,
    borderColor: "rgb(31,213,255)",
    backgroundColor: "transparent"
  },
  yesTxt: {
    color: "rgb(21,22,65)",
    fontSize: 22,
    width: 60,
    textAlign: "center",
    fontFamily: "SFProDisplay-Bold",
    letterSpacing: 0.55
  },

  navArrow: {
    width: 21,
    height: 21
  },
  tets: {}
});

const mapStateToProps = ({ gameReducer, errorsReducer }) => {
  return { gameReducer, errorsReducer };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
