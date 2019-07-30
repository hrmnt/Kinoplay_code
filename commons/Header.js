import React, {Component} from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Text,
    TouchableOpacity
} from "react-native";
import {getWidth, getHeight} from "../constants";
import hamburger from "../assets/hamburger.png";
import arrow from "../assets/navArrow.png";

const {width} = Dimensions.get("window")


class Header extends Component {
    render() {
        const {title, image = null, onBack = null, onPress = null,navStyle=null, bgColor = null, headerStyle = null, hideTitle=false, titleStyle= null} = this.props;
        return (
            <View style={[styles.container,headerStyle]}>
                {onBack &&
                    <TouchableOpacity style={{opacity:1}} onPress={() => onBack()}>
                        <Image style={[styles.navArrow,navStyle]} source={arrow}/>
                    </TouchableOpacity> 
                  }
                {
                    onPress && 
                    <TouchableOpacity style={{zIndex:9999}}  onPress={() => onPress()}>
                    <Image style={styles.burger} source={hamburger}/>
                </TouchableOpacity>
                }
                <View style={styles.row}>
                    {image && <Image style={styles.image} source={image}/>}
                    <Text style={[styles.title, hideTitle && {opacity:0}, titleStyle]}>
                        {title}
                    </Text>
                </View>
                <View style={styles.lip}></View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 10,
        paddingTop: 10,
        zIndex:999999
    },
    navArrow:{
        width:21,
        height:21,
        opacity:1,
        zIndex:99
    },
    burger: {
        width: 27,
        height: 20,
        zIndex:9999999,
        opacity:1
    },
    title: {
        color: "#fff",
        fontFamily: "SFProDisplay-Semibold",
        fontSize: getHeight(27),
        letterSpacing: 0.6,
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    lip: {
        width: getWidth(27),
        height: getHeight(18)
    },
    image: {
        width: getWidth(30),
        height: getWidth(30),
        marginRight: 10
    }

})

export default Header;


