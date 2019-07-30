import { Dimensions, StatusBar } from "react-native";
const { height, width } = Dimensions.get("window");

const getHeight = (number) => {
    return  number/812 *  height;
}

const getWidth = (number) => {
    return width * number/375
}

const statusBarHeight = StatusBar.currentHeight;



export {
    getHeight,
    getWidth,
    statusBarHeight
}