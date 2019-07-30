import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView as SF,
  Animated,
  Dimensions,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { GameHeader } from "../../commons";
import { getWidth, getHeight, statusBarHeight } from "../../constants";
import background from "../../assets/backgroundClear.png";
import { GAME_STARTED_T, BUTTON_PRESSED_T, ANSWER_GETTED_T } from "../../types";
import { connect } from "react-redux";
import {} from "../../actions/GameAction";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";

import Loading from "../Loading";

const { width } = Dimensions.get("screen");
const barWidth = Dimensions.get("screen").width - 40;
const left = width - barWidth - 20;

Animatable.initializeRegistryWithDefinitions({
  leftToRight: {
    from: {
      left: barWidth + 40
    },
    to: {
      left: left
    }
  }
});
Animatable.initializeRegistryWithDefinitions({
  leftToRightR: {
    from: {
      left: left
    },
    to: {
      left: -barWidth
    }
  }
});
Animatable.initializeRegistryWithDefinitions({
  timeLine:{
    from:{
      width:barWidth
    },
    to:{
      width:0
    }
  }
})
class QGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animated: "",
      question: {},
      firstColor: "transparent",
      secondColor: "transparent",
      ansg: false,
      pressed: false,
      number: 0,
      questions: []
    };
  }
  

  selectAnswer = question => {
    if (question === this.state.question) {
      return;
    } else if (this.state.pressed) {
      return;
    } else {
      this.props.onSelect(question);
      this.setState({
        question: question,
        pressed: true
      });
    }
  };

  reduceTimline = () => {};

  componentWillReceiveProps(nextProps) {
    let q;
    
    let indexOf;
    switch (nextProps.gameReducer.toggle) {
      case "GAME_STARTED": {
        if (this.state.animated !== "GAME_STARTED") {
          this.setState({
            animated: "GAME_STARTED",
            ansg: false,
            pressed: false
          });
          q = this.props.questions.find(
            item => item._id === nextProps.gameReducer.question.question._id
          );
          indexOf = this.props.questions.indexOf(q);
          if (indexOf !== 0) {
            this.hideAllAnimation(indexOf - 1);
          }
          this["timeLine"].timeLine(this.props.question.questionTimeout + this.props.question.pauseTimeout)

          this.showData(indexOf);
        }

        break;
      }

      case "ANSWER_GETTED": {
        if (
          this.state.animated !== "ANSWER_GETTED" &&
          this.state.ansg === false
        ) {
          this.setState({
            number: indexOf,
            animated: "ANSWER_GETTED",
            ansg: true
          });
         
        }
        break;
      }
      default:
        break;
    }
  }

  showAllAnimation = index => {
    this.showData(index);
  };

  hideAllAnimation = index => {
    this.hideData(index);
  };

  showData = index => {
    const tet = this;

    this["title" + index].leftToRight(200);
    this["ref" + index + "_0"].leftToRight(500);
    this["ref" + index + "_1"].leftToRight(600);
    this["ref" + index + "_2"].leftToRight(700);
    this["ref" + index + "_3"].leftToRight(800);
  };

  hideData = index => {
    const tet = this;
    console.log("HIDE", index);
    try {
      this["title" + index].leftToRightR(200);
      this["ref" + index + "_0"].leftToRightR(500);
      this["ref" + index + "_1"].leftToRightR(600);
      this["ref" + index + "_2"].leftToRightR(700);
      this["ref" + index + "_3"].leftToRightR(800);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    console.log(this.props.loading);
    return (
      <View style={styles.container}>
        <SF style={styles.safeHeader} />
        <StatusBar barStyle="light-content" />
        {this.props.loading && <Loading />}
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
          <Animatable.View
            ref={ref => (this.gamebox = ref)}
            style={{ flex: 1 }}
          >
            <Animatable.View
              style={{
                opacity: 1,
                width: barWidth,
                height: 6,
                borderRadius: 10,
                backgroundColor: "#eb51d9",
                marginHorizontal: 20,
                position: "absolute",
                top: getHeight(70),
                left: left - 20,
                marginBottom: 40,
                zIndex: 5
              }}
              ref={ref => (this["timeLine"] = ref)}
            />
            <Animatable.View
              style={{
                opacity: 1,
                width: barWidth,
                height: 6,
                borderRadius: 10,
                backgroundColor: "rgba(255,255,255,0.5)",
                marginHorizontal: 20,
                position: "absolute",
                top: getHeight(70),
                left: left - 20,
                marginBottom: 40,
                zIndex: 4
              }}
            />

            <GameHeader user={this.props.user} title={"Scan to Play"} />
            {this.props.questions.map((item, index) => {
              return (
                <View style={styles.gameWrap}>
                  <Animatable.View
                    style={{
                      marginBottom: 60,
                      position: "absolute",
                      top: getHeight(40),
                      left: barWidth + 40,

                      width: barWidth
                    }}
                    ref={ref => (this["title" + index] = ref)}
                  >
                    <Text style={styles.title}>{item && item.text}</Text>
                  </Animatable.View>

                  <Animatable.View
                    delay={500}
                    style={{
                      position: "absolute",
                      width: barWidth,
                      left: barWidth + 40,

                      top: getHeight(170)
                    }}
                    ref={ref => (this["ref" + index + "_0"] = ref)}
                  >
                    <LinearGradient
                      start={{ x: 0.0, y: 0.1 }}
                      end={{ x: 1.9, y: 1.8 }}
                      locations={[0, 0.6]}
                      style={[styles.btnFill]}
                      colors={
                        this.props.rightAnswer &&
                        this.props.rightAnswer._id === item.answers[0]._id
                          ? ["rgb(0,102,229)", "rgb(13,224,120)"]
                          : ["transparent", "transparent"]
                      }
                    >
                      <TouchableOpacity
                        onPress={() => this.selectAnswer(item.answers[0])}
                        style={[
                          styles.ansBtn,
                          this.state.question._id === item.answers[0]._id &&
                            styles.errorBorder
                        ]}
                      >
                        <Text style={styles.ansTxt}>
                          {item && item.answers[0].text}
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </Animatable.View>

                  <Animatable.View
                    delay={500}
                    style={{
                      opacity: 1,
                      position: "absolute",
                      width: barWidth,
                      left: barWidth + 40,
                      top: getHeight(270)
                    }}
                    ref={ref => (this["ref" + index + "_1"] = ref)}
                  >
                    <LinearGradient
                      start={{ x: 0.0, y: 0.1 }}
                      end={{ x: 1.9, y: 1.8 }}
                      locations={[0, 0.6]}
                      style={[styles.btnFill]}
                      colors={
                        this.props.rightAnswer &&
                        this.props.rightAnswer._id === item.answers[1]._id
                          ? ["rgb(0,102,229)", "rgb(13,224,120)"]
                          : ["transparent", "transparent"]
                      }
                    >
                      <TouchableOpacity
                        onPress={() => this.selectAnswer(item.answers[1])}
                        style={[
                          styles.ansBtn,
                          this.state.question._id === item.answers[1]._id &&
                            styles.errorBorder
                        ]}
                      >
                        <Text style={styles.ansTxt}>
                          {item && item.answers[1].text}
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </Animatable.View>
                  <Animatable.View
                    delay={500}
                    style={{
                      opacity: 1,
                      position: "absolute",
                      width: barWidth,
                      top: 120,
                      left: barWidth + 40,
                      top: getHeight(370)
                    }}
                    ref={ref => (this["ref" + index + "_2"] = ref)}
                  >
                    <LinearGradient
                      start={{ x: 0.0, y: 0.1 }}
                      end={{ x: 1.9, y: 1.8 }}
                      locations={[0, 0.6]}
                      style={[styles.btnFill]}
                      colors={
                        this.props.rightAnswer &&
                        this.props.rightAnswer._id === item.answers[2]._id
                          ? ["rgb(0,102,229)", "rgb(13,224,120)"]
                          : ["transparent", "transparent"]
                      }
                    >
                      <TouchableOpacity
                        onPress={() => this.selectAnswer(item.answers[2])}
                        style={[
                          styles.ansBtn,
                          this.state.question._id === item.answers[2]._id &&
                            styles.errorBorder
                        ]}
                      >
                        <Text style={styles.ansTxt}>
                          {item && item.answers[2].text}
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </Animatable.View>
                  <Animatable.View
                    delay={500}
                    style={{
                      opacity: 1,
                      position: "absolute",
                      width: barWidth,
                      left: barWidth + 40,

                      top: getHeight(470)
                    }}
                    ref={ref => (this["ref" + index + "_3"] = ref)}
                  >
                    <LinearGradient
                      start={{ x: 0.0, y: 0.1 }}
                      end={{ x: 1.9, y: 1.8 }}
                      locations={[0, 0.6]}
                      style={[styles.btnFill]}
                      colors={
                        this.props.rightAnswer &&
                        this.props.rightAnswer._id === item.answers[3]._id
                          ? ["rgb(0,102,229)", "rgb(13,224,120)"]
                          : ["transparent", "transparent"]
                      }
                    >
                      <TouchableOpacity
                        onPress={() => this.selectAnswer(item.answers[3])}
                        style={[
                          styles.ansBtn,
                          this.state.question._id === item.answers[3]._id &&
                            styles.errorBorder
                        ]}
                      >
                        <Text style={styles.ansTxt}>
                          {item && item.answers[3].text}
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </Animatable.View>
                </View>
              );
            })}
          </Animatable.View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight
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
    alignItems: "center",
    paddingBottom: 40
  },
  slide: {
    backgroundColor: "red"
  },
  image: {
    height: 290,
    width: "100%",
    borderRadius: 20,
    resizeMode: "contain"
  },
  imageContainer: {
    height: 290,
    width: 200,
    width: "100%",
    borderRadius: 20
  },
  item: {
    width: "100%"
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Gilroy-Bold"
  },
  btnWrap: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  yesBtn: {
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 24,
    borderColor: "rgb(31,213,255)"
  },
  noBtn: {
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 24,
    backgroundColor: "#fff"
  },
  yesTxt: {
    color: "#fff",
    fontSize: 22,
    width: 60,
    textAlign: "center",
    fontFamily: "SFProDisplay-Bold",
    letterSpacing: 0.55
  },
  ansBtn: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 100,
    height: 65,
    alignItems: "center",
    justifyContent: "center"
  },
  ansTxt: {
    color: "#fff",
    fontFamily: "Gilroy-Semibold",
    fontSize: 18
  },
  gameWrap: {
    position: "absolute",
    top: getHeight(80)
  },
  errorBorder: {
    borderColor: "rgb(31,213,255)",
    borderWidth: 1
  },
  btnFill: {
    borderRadius: 100,
    height: 65
  }
});

const mapStateToProps = ({ gameReducer, errorsReducer }) => {
  return { gameReducer, errorsReducer };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QGame);
