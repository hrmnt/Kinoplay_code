import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import LinearGradient from "react-native-linear-gradient";


class Profile extends  Component {


    render(){
        const { btnStyle = null  , text , onPress  }  = this.props;
        return(
            <LinearGradient start={[0.8,0.2]} style={styles.btnFill} colors={[ "rgb(255,54,165)", "rgb(190,56,255)"]}>
                <TouchableOpacity style={styles.btnFill}>
                    <Text style={styles.btnT}>
                        ЗАРЕГИСТРИРОВАТЬСЯ
                    </Text>
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
        justifyContent:"center",
        borderRadius:27
    },
})


export  default  Profile;


