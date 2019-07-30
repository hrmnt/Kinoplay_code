import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from "react-native";
import strelka from "../../assets/strelka.png";
import background from "../../assets/backgroundClear.png";
import frame from "../../assets/phoneFrame.png";
import rotateA from "../../assets/rotateA.png";

import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";
const { width, height } = Dimensions.get("window");
import Loading from "../Loading";


class StoryTelling extends Component {
  state = {
    fheight: 0,
    fwidth: 0,
    sheight: 0,
    sweight: 0,
    selected: {},
    pressed: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.rotateA.transitionTo(
        {
          transform: [{ rotate: "-180deg" }]
        },
        1000
      );
    }, 1000);
  }

  qStart = () => {
    this.rollOut.transitionTo(
      {
        opacity: 0,
        zIndex:0
      },
      400
    );
    this.viewBox.transitionTo(
      {
        opacity: 1,
        zIndex:4
      },
      400
    );
    this.answersBox.transitionTo(
      {
        opacity: 0,
        zIndex:0
      },
      400
    );
    this.sP.transitionTo(
      {
        opacity: 0
      },
      500,
      "linear"
    );
    this.fP.transitionTo(
      {
        opacity: 0
      },
      500,
      "linear"
    );

    setTimeout(() => {
      this.firstS.transitionTo(
        {
          opacity: 1
        },
        200
      );
      setTimeout(() => {
        this.secondS.transitionTo(
          {
            opacity: 1
          },
          200
        );
        this.firstS.transitionTo(
          {
            opacity: 0
          },
          200
        );
        setTimeout(() => {
          this.thirdS.transitionTo(
            {
              opacity: 1
            },
            200
          );
          this.secondS.transitionTo(
            {
              opacity: 0
            },
            200
          );
          setTimeout(() => {
            this.thirdS.transitionTo(
              {
                opacity: 0
              },
              200
            );
            this.firstS.transitionTo(
              {
                opacity: 1
              },
              200
            );
            setTimeout(() => {
              this.secondS.transitionTo(
                {
                  opacity: 1
                },
                200
              );
              setTimeout(() => {
                this.thirdS.transitionTo(
                  {
                    opacity: 1
                  },
                  200
                );
              }, 200);
            }, 200);
          }, 200);
        }, 200);
      }, 200);
    }, 500);
  };

  answerStart = () => {
    this.viewBox.transitionTo(
      {
        opacity: 0,
        zIndex:0
      },
      400
    );
    this.answersBox.transitionTo(
      {
        opacity: 1,
        zIndex:4

      },
      400
    );
    this.timeline.transition(
      {
        height: height
      },
      {
        height: 0
      },
      this.props.resultTimeout + this.props.questionTimeout,
      "linear"
    );
  };

  answerGetted = () => {
    setTimeout(() => {
      this.sP.transitionTo(
        {
          opacity: 1
        },
        500,
        "linear"
      );
      this.fP.transitionTo(
        {
          opacity: 1
        },
        500,
        "linear"
      );
    }, 500);
  };

  onPress = question => {
    console.log(question)
    if (!this.state.pressed) {
      this.setState({
        selected: question,
        pressed: true
      });
      this.props.onSelect(question);
    }
    return;
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.gameReducer.toggle);
    const { gameReducer } = this.props;
    const { question } = gameReducer;

    switch (nextProps.gameReducer.toggle) {
      case "PREVIEW_STARTED": {
        if (this.state.animated !== "PREVIEW_STARTED") {
          this.setState({
            animated: "PREVIEW_STARTED",
            selected: "",
            pressed:false
          });
          this.qStart();
          // this["timeLine"].transitionTo(
          //   {
          //     width: 0
          //   },
          //   question.questionTimeout * 1000,
          //   "ease-in-out"
          // );
        }

        break;
      }
      case "ANSWERS_GETTED": {
        if (this.state.animated !== "ANSWERS_GETTED") {
          this.setState({
            animated: "ANSWERS_GETTED"
          });
          this.answerStart();
          // this["timeLine"].transitionTo(
          //   {
          //     width: 0
          //   },
          //   question.questionTimeout * 1000,
          //   "ease-in-out"
          // );
        }
        break;
      }
      case "ANSWER_GETTED": {
        if (this.state.animated !== "ANSWER_GETTED") {
          this.setState({
            animated: "ANSWER_GETTED"
          });
          this.answerGetted();
        }
        break;
      }
      default:
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={{ flex: 1 }} source={background}>
          <StatusBar hidden={true} />
          {this.props.loading && <Loading />}
          <Animatable.View
            ref={ref => (this.viewBox = ref)}
            style={styles.viewBox}
          >
            <View style={styles.txtWrap}>
              <Text style={styles.lookUpT}>ПОСМОТРИТЕ</Text>
              <Text style={styles.lookUpT}>НА ЭКРАН</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Animatable.Image
                ref={ref => (this.firstS = ref)}
                style={styles.strelka}
                source={strelka}
              />
              <Animatable.Image
                ref={ref => (this.secondS = ref)}
                style={styles.strelka}
                source={strelka}
              />

              <Animatable.Image
                ref={ref => (this.thirdS = ref)}
                style={styles.strelka}
                source={strelka}
              />
            </View>
          </Animatable.View>
          <Animatable.View
            ref={ref => (this.rollOut = ref)}
            style={[styles.viewBox, { opacity: 1, zIndex:4 }]}
          >
            <View style={styles.txtWrap}>
              <Text style={styles.lookUpT}>ПЕРЕВЕРНИТЕ</Text>
              <Text style={styles.lookUpT}>ТЕЛЕФОН</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Animatable.Image
                ref={ref => (this.frame = ref)}
                style={styles.frame}
                source={frame}
              />
              <Animatable.Image
                ref={ref => (this.rotateA = ref)}
                style={styles.rotateA}
                source={rotateA}
              />
            </View>
          </Animatable.View>
          
          <Animatable.View
            ref={ref => (this.answersBox = ref)}
            style={[styles.imagesBox, { flexDirection: "row" }]}
          >
            <View style={{ flex: 1, backgroundColor:"#000" }}>
              <TouchableOpacity
                onLayout={event => {
                  var { x, y, width, height } = event.nativeEvent.layout;
                  this.setState({
                    swidth: width,
                    sheight: height
                  });
                }}
                onPress={() =>   this.onPress(this.props.cAnswers.firstAnswer)}
                style={[styles.firstImageWrap]}
              >
                <Animatable.View
                  ref={ref => (this.fil = ref)}
                  style={[
                    styles.layout,
                    this.props.cAnswers.firstAnswer &&
                      this.state.selected ===
                        this.props.cAnswers.firstAnswer && {
                        opacity: 0
                      }
                  ]}
                />

                <Animatable.Text
                  style={{
                    position: "absolute",
                    color: "#fff",
                    fontSize: 47,
                    fontFamily: "Gilroy-Bold",
                    top: 0,
                    zIndex: 10,
                    width: 160,
                    transform: [{ rotate: "90deg" }],
                    alignSelf: "center",
                    textShadowOffset: { width: -1, height: 0 },
                    textShadowColor: "rgba(255, 255, 255, 0.75)",
                    textShadowRadius: 4,
                    textAlign: "center",
                    top: this.state.fheight / 2 - 25,
                    opacity: 0,
                    zIndex: 100
                  }}
                  ref={ref => (this.sP = ref)}
                >
                  {this.props.cAnswers.firstAnswer &&
                    this.props.cAnswers.firstAnswer.percentage}{" "}
                  %
                </Animatable.Text>

                <Image
                  resizeMode="cover"
                  source={{
                    uri:
                      this.props.cAnswers.firstAnswer &&
                      this.props.cAnswers.firstAnswer.answer.preview
                  }}
                  style={[
                    styles.image,
                    {
                      top: (this.state.sheight - this.state.swidth) / 2,
                      right: (this.state.sheight - this.state.swidth) / 2,
                      height: this.state.swidth,
                      width: this.state.sheight
                    }
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onLayout={event => {
                  var { x, y, width, height } = event.nativeEvent.layout;
                  this.setState({
                    fwidth: width,
                    fheight: height
                  });
                  console.log();
                }}
                onPress={() =>  this.onPress(this.props.cAnswers.secondAnswer)}
                style={styles.secondImageWrap}
              >
                <Animatable.View
                  ref={ref => (this.sil = ref)}
                  style={[
                    styles.layout,
                    this.props.cAnswers.secondAnswer &&
                      this.state.selected ===
                        this.props.cAnswers.secondAnswer && {
                        opacity: 0
                      }
                  ]}
                />
                <Animatable.Text
                  style={{
                    position: "absolute",
                    color: "#fff",
                    fontSize: 47,
                    fontFamily: "Gilroy-Bold",
                    top: 0,
                    zIndex: 10,
                    width: 160,
                    transform: [{ rotate: "90deg" }],
                    alignSelf: "center",
                    textShadowOffset: { width: -1, height: 0 },
                    textShadowColor: "rgba(255, 255, 255, 0.75)",
                    textShadowRadius: 4,
                    textAlign: "center",
                    top: this.state.fheight / 2 - 25,
                    opacity: 0,
                    zIndex: 100
                  }}
                  ref={ref => (this.fP = ref)}
                >
                  {this.props.cAnswers.secondAnswer &&
                    this.props.cAnswers.secondAnswer.percentage}
                  %
                </Animatable.Text>

                <Image
                  resizeMode="cover"
                  source={{
                    uri:
                      this.props.cAnswers.secondAnswer.answer &&
                      this.props.cAnswers.secondAnswer.answer.preview
                  }}
                  style={[
                    styles.image,
                    {
                      bottom: (this.state.fwidth - this.state.fheight) / 2,
                      right: (this.state.fheight - this.state.fwidth) / 2,
                      height: this.state.fwidth,
                      width: this.state.fheight
                    }
                  ]}
                />
              </TouchableOpacity>
            </View>
            <Animatable.View
              ref={ref => (this.timeline = ref)}
              style={styles.progress}
            />
            <Animatable.View
              style={[styles.progress,{
                backgroundColor: "#000",
                position:"absolute",
                right:0,
                zIndex:0,
                width: 14,
                height: height
              }]}
            />
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151641",
    flexDirection: "row"
  },
  imagesBox: {
    width: "100%",
    height: "100%",
    opacity: 0
  },
  strelka: {
    width: 52,
    height: 170,
    opacity: 0
  },
  viewBox: {
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
    flexDirection: "row",
    opacity: 0
  },
  txtWrap: {
    transform: [{ rotate: "90deg" }]
  },
  lookUpT: {
    color: "#fff",
    fontFamily: "Gilroy-Bold",
    fontSize: 24,
    textShadowOffset: { width: -1, height: 0 },
    textShadowColor: "rgba(255, 255, 255, 0.75)",
    textShadowRadius: 4,
    textAlign: "center"
  },
  progress: {
    backgroundColor: "#ff4343",
    width: 14,
    zIndex:1,
    height: height
  },
  firstImageWrap: {
    flex: 1,
    position: "relative",
    marginBottom: 3
  },
  secondImageWrap: {
    marginTop: 3,
    flex: 1,
    backgroundColor: "rgba(21, 22, 65, 0.7)"
  },
  image: {
    transform: [{ rotate: "90deg" }]
  },
  layout: {
    position: "absolute",
    backgroundColor: "rgba(21, 22, 65, 0.7)",
    width: "100%",
    height: "100%",
    zIndex: 10
  },
  frame: {
    width: 75,
    height: 149
  },
  rotateA: {
    width: 46,
    height: 46,
    position: "absolute"
  }
});
const mapStateToProps = ({ gameReducer, errorsReducer }) => {
  return { gameReducer, errorsReducer };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryTelling);
