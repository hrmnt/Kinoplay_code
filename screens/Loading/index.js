import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView as SF,
  Animated,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-navigation";
import background from "../../assets/background.png";
import logoFlip from "../../assets/logoFilp.png";
import { getHeight, getWidth, statusBarHeight } from "../../constants";

import * as Animatable from "react-native-animatable";
import Svg from "react-native-svg";

const { width, height } = Dimensions.get("window");

class Loading extends Component {
  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <SF style={styles.safeHeader} />
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
          <Animatable.Image
            ref={ref => (this.logo = ref)}
            style={styles.logo}
            source={logoFlip}
          />
          <Animatable.View
            ref={ref => (this.loading = ref)}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 100,
              height: 100,
              position: "relative",
              top:height/2 -50,
              alignSelf: "center"
            }}
          >
            <Animatable.View
              animation="rotate"
              iterationCount="infinite"
              easing="ease-in-out"
              direction="reverse"
              duration={800}
              delay={800}
              style={{
                height: 100,
                width: 100,
                alignItems: "flex-end",
                justifyContent: "flex-end",
                bottom: 0,
                right: 0,
                position: "absolute"
              }}
            >
              <Svg viewBox="0 0 65 66" height={53} width={53}>
                <Svg.Path
                  d="M4.603 60.506c27.866-.06 55.86-21.388 55.86-55.744"
                  strokeWidth="7.8"
                  fill="none"
                  stroke="#6bfd87"
                  strokeLinecap="round"
                  stroke-miterlimit="50"
                />
              </Svg>
            </Animatable.View>
            <Animatable.View
              animation="rotate"
              iterationCount="infinite"
              easing="ease-in-out-quad"
              duration={800}
              style={{ alignSelf: "center", position: "absolute" }}
            >
              <Svg viewBox="0 0 120 10" height={100} width={100}>
                <Svg.Path
                  d="M4.498 4.908c0 32.796 27.24 55.658 55.105 55.598 27.866-.06 55.86-21.388 55.86-55.744"
                  strokeWidth="8"
                  fill="none"
                  stroke="#ff34da"
                  strokeLinecap="round"
                  stroke-miterlimit="50"
                />
              </Svg>
            </Animatable.View>
          </Animatable.View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position:"absolute",
    width:"100%",
    height:"100%",
    zIndex:999,
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
    flex: 1,
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
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontFamily: "SFProDisplay-Bold",
    marginBottom: 20
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
  logo: {
    height: 85,
    width: 130,
    alignSelf: "center",
    position: "absolute",
    top: getHeight(96)
  }
});

export default Loading;
