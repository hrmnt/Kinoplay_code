import React, {Component} from "react";
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    Dimensions
} from "react-native";
import {getWidth, getHeight} from "../constants";
import arrow from "../assets/navArrow.png";



class GameHeader extends Component {
    render() {
        const {
            onBack = null, headerStyle = null, progress = 100,
            progressWithOnComplete = 0,
            progressCustomized = 0
        } = this.props;
        const barWidth = Dimensions.get('screen').width - 100;
        return (
            <View style={[styles.container, headerStyle]}>
                <TouchableOpacity style={{zIndex:99999}} onPress={() => onBack()}>
                    <Image style={styles.navArrow} source={arrow}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row}>
                   <Text style={styles.boun}>
                       {this.props.user.score} B
                   </Text>
                </TouchableOpacity>
                <View style={styles.lip}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 20,
        paddingTop: 10,
        zIndex:20
    },
    navArrow: {
        width: 21,
        height: 21,
        marginRight: 10
    },
    burger: {
        width: 27,
        height: 18
    },
    title: {
        color: "#fff",
        fontFamily: "SFProDisplay-Semibold",
        fontSize: 27,
        letterSpacing: 0.6
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    lip: {
        marginLeft:10,
        width: getWidth(27),
        height: getHeight(18)
    },
    image: {
        width: 36,
        height: 36,
        marginRight: 10
    },
    boun:{
        fontSize:24,
        fontFamily:"SFProDisplay-Semibold",
        color:"#fff"
    }

})

export default GameHeader;


