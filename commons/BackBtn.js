import React, {Component} from "react";
import {TouchableOpacity, Image,Text, StyleSheet} from "react-native";
import back from "../assets/navArrow.png";

const BackBtn = (props) =>(
    <TouchableOpacity onPress={() => props.onPress()} style={styles.container}>
        <Image style={styles.back} source={back}/>
        <Text style={styles.txt}>
            Назад
        </Text>
    </TouchableOpacity>

)

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        position:"absolute",
        top:24,
        left:10,
        alignItems:'center',
        zIndex:10
    },
    back:{
        height:21,
        width:21,
        marginRight:5
    },
    txt:{
        color:"#fff"
    }
})

export default BackBtn