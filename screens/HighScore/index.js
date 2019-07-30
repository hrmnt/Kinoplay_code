import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView as SF,
  Animated,
  Dimensions,
  ScrollView,
  findNodeHandle,
  StatusBar
} from "react-native";
import { sortBy } from "lodash";
import * as Animatable from "react-native-animatable";
import { GameHeader } from "../../commons";

import background from "../../assets/Rectangle.png";
import winner from "../../assets/winner.png";
import silver from "../../assets/silver.png";
import startI from "../../assets/icon_points.png";
import firstPlace from "../../assets/firstPlace.png";
import secondPlace from "../../assets/secondPlace.png";
import thirdPlace from "../../assets/thirdPlace.png";
import { getWidth, getHeight } from "../../constants";

import LinearGradient from "react-native-linear-gradient";

import { connect } from "react-redux";
Animatable.initializeRegistryWithDefinitions({
  bounceFirst: {
    0: {
      bottom: -getHeight(438)
    },
    0.8: {
      bottom: 0
    },
    1: {
      bottom: -getHeight(60)
    }
  }
});
const { width, height } = Dimensions.get("window");
class HighScore extends Component {
  state = { viewRef: null };
  componentDidMount() {
    setTimeout(() => {
      this.startAnimation();
    }, 1000);
  }

  startAnimation = () => {
    this.firstPlace.bounceFirst(500);

    setTimeout(() => {
      this.secondPlace.bounceFirst(500);

      setTimeout(() => {
        this.thirdPlace.bounceFirst(500);
      }, 200);
    }, 200);

    setTimeout(() => {
      this.fUser.transitionTo(
        {
          opacity: 1,
          top: 0
        },
        2000
      );
      if (
        this.props.session.users &&
        this.props.session.users.length > 1
      ) {
        setTimeout(() => {
          this.sUser.transitionTo(
            {
              opacity: 1,
              top: 20
            },
            2000
          );
          if (
            this.props.session.users &&
            this.props.session.users.length > 2
          ) {
            setTimeout(() => {
              this.tUser.transitionTo(
                {
                  opacity: 1,
                  top: 0
                },
                2000
              );
            }, 400);
          }
        }, 400);
      }
    }, 400);
  };

  onTextViewLoaded = () => {
    this.setState({ viewRef: findNodeHandle(this.viewRef) });
  };

  goBack = () => {
    this.props.onBack();
  };

  render() {
    return (
      <View style={styles.container}>
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
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </Animated.View>
        <SF
          ref={viewRef => {
            this.viewRef = viewRef;
          }}
          onLayout={() => {
            this.onTextViewLoaded();
          }}
          style={styles.wrapContainer}
        >
          <GameHeader
            onPress={() => this.goBack()}
            onBack={this.props.onBack}
            user={this.props.user}
            title={"Leaderboard"}
          />

          <View style={{ position: "absolute", width: "100%", height: "100%" }}>
            <Animatable.Image
              style={{
                width: 118,
                height: 384,
                bottom: -367,
                zIndex: 4,

                position: "absolute",
                left: width / 2 - 118 - 20
              }}
              ref={ref => (this.secondPlace = ref)}
              source={secondPlace}
            />
            <Animatable.Image
              style={{
                width: 127,
                height: 450,
                position: "absolute",
                bottom: -438,
                left: width / 2 - 64,
                zIndex: 5
              }}
              resizeMode="cover"
              ref={ref => (this.firstPlace = ref)}
              source={firstPlace}
            />
            <Animatable.Image
              style={{
                width: 120,
                height: 326 + 18,
                position: "absolute",
                bottom: -350,
                zIndex: 4,
                right: width / 2 - 120 - 20
              }}
              ref={ref => (this.thirdPlace = ref)}
              source={thirdPlace}
            />
          </View>
          <View style={styles.scoreWrap}>
            <View style={styles.row}>
              <LinearGradient
                start={[-0.1, -0.1]}
                end={[1.2, 1.6]}
                style={[styles.btnFill]}
                colors={["rgba( 58,62,175,1)", "rgb(31,213,255)"]}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    paddingHorizontal: 12,
                    height: 50,
                    width: width / 2 - 25,
                    justifyContent: "space-between"
                  }}
                  onPress={() => this.startAnimation()}
                >
                  <View>
                    <Text style={styles.btnMT}>Правильные</Text>
                    <Text style={styles.btnMT}>ответы</Text>
                  </View>
                  <Text style={styles.btnFT}>
                    {this.props.session.users &&
                      this.props.session.users.find(item => {
                        console.log(item);
                        return item._id === this.props.user._id;
                      }).correct_answer_amount}
                    /
                    {this.props.session.quiz &&
                      this.props.session.quiz.questions.length}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                start={[-0.1, -0.1]}
                end={[1.2, 1.6]}
                style={[styles.btnFill]}
                colors={["rgb(185,81,235)", "rgb(31,213,255)"]}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    paddingHorizontal: 12,
                    height: 50,
                    width: width / 2 - 25,
                    justifyContent: "space-between"
                  }}
                  onPress={() => this.startAnimation()}
                >
                  <View>
                    <Text style={styles.btnMT}>Набранные</Text>
                    <Text style={styles.btnMT}>баллы</Text>
                  </View>
                  <Text style={styles.btnFT}>
                    {this.props.session.users &&
                      this.props.session.users.find(
                        item => item._id === this.props.user._id
                      ).score}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View
              style={[
                styles.row,
                { paddingHorizontal: 10, height: 200, zIndex: 3 }
              ]}
            >
              <Animatable.View
                style={{
                  height: "100%",
                  justifyContent: "center",
                  position: "absolute",
                  left: 9,
                  top: 100,
                  opacity: 0,
                  zIndex: 3
                }}
                ref={ref => (this.sUser = ref)}
              >
                <Image
                  style={{ width: 78, height: 78, marginBottom: 10 }}
                  source={silver}
                />
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "SFProDisplay-Semibold",
                    fontSize: 14
                  }}
                >
                  {this.props.session.users.length>1 &&
                    this.props.session.users[1].user.username}
                </Text>
              </Animatable.View>

              <Animatable.View
                style={{
                  position: "absolute",
                  left: width / 2 - 82 / 2 - 17,
                  opacity: 0,
                  top: 100,
                  zIndex: 3,
                  alignItems: "center"
                }}
                ref={ref => (this.fUser = ref)}
              >
                <Image
                  style={{ width: 82, height: 93, marginBottom: 10 }}
                  source={winner}
                />
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "SFProDisplay-Semibold",
                    fontSize: 14
                  }}
                >
                  {this.props.session.users &&
                    this.props.session.users[0].user.username}
                </Text>
              </Animatable.View>
              <Animatable.View
                style={{
                  height: "100%",
                  justifyContent: "flex-end",
                  position: "absolute",
                  right: 9,
                  opacity: 0,
                  top: 100,
                  zIndex: 3
                }}
                ref={ref => (this.tUser = ref)}
              >
                <Image
                  style={{ width: 78, height: 78, marginBottom: 10 }}
                  source={silver}
                />
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "SFProDisplay-Semibold",
                    fontSize: 14
                  }}
                >
                  {this.props.session.users.length> 2 &&
                    this.props.session.users[2].user.username}
                </Text>
              </Animatable.View>
            </View>
          </View>
          <View
            tint="default"
            intensity={40}
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={3}
            blurRadius={5}
            style={{
              height: (259 / 812) * height,
              width: width,
              backgroundColor: "rgba(49,38,245,0.48)",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              position: "absolute",
              bottom: 0,
              zIndex: 15
            }}
          >
            <ScrollView
              style={{
                backgroundColor: "rgba(21,22,65,0.6)"
              }}
              contentContainerStyle={{ padding: 10 }}
            >
              {this.props.session.users &&
                this.props.session.users.map((item, index) => {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                        paddingVertical: 5,
                        paddingHorizontal: 17,
                        justifyContent: "space-between"
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text
                          style={{
                            marginRight: 17,
                            color: "#fff",
                            fontSize: 20,
                            fontWeight: "700"
                          }}
                        >
                          {index + 1}
                        </Text>
                        <Image
                          style={{ width: 33, height: 33, marginRight: 24 }}
                          source={silver}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "500",
                            color: "#fff"
                          }}
                        >
                          {item.user.username}
                        </Text>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Image
                          style={{ width: 18, height: 18, marginRight: 13 }}
                          source={startI}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "500",
                            color: "#fff"
                          }}
                        >
                          {item.score}
                        </Text>
                      </View>
                    </View>
                  );
                })}
            </ScrollView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
                paddingVertical: 5,
                paddingHorizontal: 17,
                marginHorizontal: 10,
                borderRadius: 30,
                backgroundColor: "rgb(40,42,100)",
                justifyContent: "space-between",
                borderColor: "rgb(255,52,218)",
                borderWidth: 1,
                position: "absolute",
                alignSelf: "center",
                width: width - 20,
                bottom: 20
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    marginRight: 17,
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: "700"
                  }}
                >
                  {this.props.session.users &&
                    this.props.session.users.map((item, index) => {
                      if (item._id === this.props.user._id) {
                        return index + 1;
                      }
                    })}
                </Text>
                <Image
                  style={{ width: 33, height: 33, marginRight: 24 }}
                  source={silver}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#fff"
                  }}
                >
                  {this.props.session.users &&
                    this.props.session.users.find(
                      item => item._id === this.props.user._id
                    ).user.username}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{ width: 18, height: 18, marginRight: 13 }}
                  source={startI}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#fff"
                  }}
                >
                  {this.props.session.users &&
                    this.props.session.users.find(
                      item => item._id === this.props.user._id
                    ).score}
                </Text>
              </View>
            </View>
          </View>
        </SF>
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
  scoreWrap: {
    paddingHorizontal: 17,
    marginBottom: 30
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 38
  },
  btnFill: {
    borderRadius: 10
  },
  btnMT: {
    fontSize: 10,
    fontWeight: "600",
    color: "#fff"
  },
  btnFT: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff"
  },
  txtN: {}
});

const mapStateToProps = ({ gameReducer, errorsReducer }) => {
  return { gameReducer, errorsReducer };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HighScore);
