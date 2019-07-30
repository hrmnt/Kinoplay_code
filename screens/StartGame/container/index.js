import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView as SF,
  Image,
  Button,
  Dimensions,
  StatusBar,
  TextInput
} from "react-native";
import { getWidth, statusBarHeight } from "../../../constants";
import { Header } from "../../../commons";
import { SafeAreaView } from "react-navigation";
import flash from "../../../assets/flash.png";

const { width, height } = Dimensions.get("window");

class StartGameContiner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      start: false,
      code: ""
    };
  }

  async componentDidMount() {}

  handleBarCodeScanned = () => {
    console.log(typeof Number(this.state.code));
    this.props.socket.emit("quiz_session_connect", { code: Number(this.state.code) });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView
          forceInset={{ bottom: "never" }}
          style={styles.wrapContainer}
        >
          <Header
            titleStyle={{
              fontFamily: "SFProDisplay-Semibold"
            }}
            headerStyle={styles.header}
            onBack={() => this.props.onBack()}
            title={"Scan to Play"}
          />
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 120
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                textAlign: "center",
                width: "75%"
              }}
            >
              Введите код с экрана для входа в игру
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: "75%",
                justifyContent: "space-between"
              }}
            >
              <TextInput
                ref={ref => (this.firstI = ref)}
                onChangeText={async text => {
                  await this.setState({
                    code: this.state.code + text,
                    first: text
                  });
                  if (this.state.first.length > 0) {
                    this.secondI.focus();
                  }
                }}
                value={this.state.first}
                keyboardType="number-pad"
                maxLength={1}
                placeholder="0"
                placeholderTextColor="#ccc"
                style={{
                  height: 120,
                  width: 60,
                  borderBottomColor: "#eb51d9",
                  borderBottomWidth: 2,
                  color: "#fff",
                  fontSize: 35,
                  textAlign: "center"
                }}
              />
              <TextInput
                value={this.state.second}
                ref={ref => (this.secondI = ref)}
                onChangeText={async text => {
                  await this.setState({
                    code: this.state.code + text,
                    second: text
                  });
                  if (this.state.second.length > 0) {
                    this.thirdI.focus();
                  } else {
                    this.firstI.focus();
                  }
                }}
                keyboardType="number-pad"
                maxLength={1}
                placeholder="0"
                placeholderTextColor="#ccc"
                style={{
                  height: 120,
                  width: 60,
                  borderBottomColor: "#eb51d9",
                  borderBottomWidth: 2,
                  color: "#fff",
                  fontSize: 35,
                  textAlign: "center"
                }}
              />
              <TextInput
                value={this.state.third}
                ref={ref => (this.thirdI = ref)}
                onChangeText={ async text => {
                  await this.setState({
                    code: this.state.code + text,
                    third: text
                  });
                  if (this.state.third.length > 0) {
                    this.foursI.focus();

                  }
                  else{
                    this.secondI.focus();

                  }
                }}
                keyboardType="number-pad"
                maxLength={1}
                placeholder="0"
                placeholderTextColor="#ccc"
                style={{
                  height: 120,
                  width: 60,
                  borderBottomColor: "#eb51d9",
                  borderBottomWidth: 2,
                  color: "#fff",
                  fontSize: 35,
                  textAlign: "center"
                }}
              />
              <TextInput
                value={this.state.four}
                ref={ref => (this.foursI = ref)}
                onChangeText={async text => {
                  await this.setState({
                    code: this.state.code + text,
                    four: text
                  });
                  if(this.state.four.length > 0){
                    this.handleBarCodeScanned();
                  }
                  else{
                    this.thirdI.focus();
                  }
                }}
                keyboardType="number-pad"
                maxLength={1}
                placeholder="0"
                placeholderTextColor="#ccc"
                style={{
                  height: 120,
                  width: 60,
                  borderBottomColor: "#eb51d9",
                  borderBottomWidth: 2,
                  color: "#fff",
                  fontSize: 35,
                  textAlign: "center"
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(21,22,65)"
  },
  safeHeader: {
    flex: 0,
    backgroundColor: "rgb(21,22,65)"
  },
  header: {
    backgroundColor: "rgb(21,22,65)",
    justifyContent: "space-between"
  },
  wrapContainer: {
    flex: 1,
    paddingTop: statusBarHeight
  },
  pList: {
    flex: 1,
    position: "relative",
    backgroundColor: "rgba(0,0,0,0.7)"
  },

  borderBox: {
    position: "relative",
    width: getWidth(250),
    height: getWidth(250)
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  box: {
    flex: 1
  },
  setRight: {
    right: 0
  },
  setBottom: {
    bottom: 0
  },
  top: {
    position: "absolute",
    height: 10,
    width: "90%",
    borderRadius: 5,
    backgroundColor: "#fff"
  },
  left: {
    position: "absolute",
    height: "90%",
    width: 10,
    borderRadius: 5,
    backgroundColor: "#fff"
  },
  right: {
    position: "absolute",
    right: 0,
    height: "90%",
    width: 10,
    borderRadius: 5,
    backgroundColor: "#fff"
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "SFProDisplay-Regular"
  },
  flash: {
    height: 32,
    width: 32
  },
  adsad: {
    height: "100%",
    width: "100%",
    position: "absolute",
    flex: 1,
    alignItems: "center",

    justifyContent: "space-around",
    backgroundColor: "rgba(0,0,0,0.7)"
  }
});

export default StartGameContiner;
