import {TOGGLE_DRAWER} from "../types";

// prod
// const url = "http://185.146.3.176/api";


// dev
// const url = "http://192.168.0.100:3000/api"

export const toggleDrawer = () => dispatch =>{
    console.log("ASD")
    dispatch({
        type:TOGGLE_DRAWER,
        payload:""
    })
}
