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
import { statusBarHeight } from "../../constants"


const { width, height } = Dimensions.get("window");

class Privacy extends Component {
  componentDidMount() {
    
    
  }

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
          <Text>Приват</Text>
           
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
  }
});

export default Privacy;
