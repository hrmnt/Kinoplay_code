import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {getWidth, getHeight} from "../constants";


class Button extends  Component {


    render(){
        const { btnStyle = null  , text , subText= null, onPress, textSize= 14 ,gradFirst = "rgb(255,54,165)", gradSecond= "rgb(190,56,255)" , image= null}  = this.props;
        return(
            <LinearGradient start={[1.2,0.1]} style={[styles.btnFill, btnStyle]} colors={[ gradFirst, gradSecond]}>
                <TouchableOpacity onPress={() => this.props.onPress()} style={[styles.btnFill, image? {flexDirection: 'row', paddingRight:35}: null]}>
                    {
                        image && <Image  style={styles.image} source={image}/>
                    }
                    {
                        subText ? <View>
                            <Text style={[styles.btnT, {fontSize: textSize}]}>
                                {text}
                            </Text>
                            {subText &&
                            <Text style={styles.subT}>
                                {subText}
                            </Text>
                            }
                        </View>:
                            <Text style={[styles.btnT, {fontSize: textSize}]}>
                                {text}
                            </Text>

                    }

                </TouchableOpacity>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    btnFill:{
        alignSelf:"center",
        height:54,
        alignItems:"center",
        justifyContent:'space-between',
        borderRadius:27,
        width:"100%",
    },
    btnT: {
        fontSize: getWidth(19),
        color: "#fff",
        letterSpacing: 1,
        fontFamily:"SFProDisplay-Semibold"
    },
    subT:{
        fontSize:getWidth(9),
        fontFamily:"SFProDisplay-Semibold",
        letterSpacing: 1,
        color: "#fff",
    },
    image:{
        height: 62,
        width:62,
    }

})


export  default  Button;


