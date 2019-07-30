import io from "socket.io-client";
import { SAVE_SOCKET,FETCH_SESSION,NEW_GAME, FETCH_QUESTION,ANOTHER_TOGGLE, FETCH_USER, FETCH_QUESTIONS, TOGGLE_BUTTONS } from "../types";

let socket=  io.connect("ws://185.146.3.176", {
    query: {
      token:
        "fd32d6a661adde97e231836b9c463fbf40220d185318f356a894d4fd7ff5957c"
    }
  });

export const connectToGame = (io,token) => dispatch =>{

}


export const fetchQuestions = questions => dispatch =>{
    dispatch({
        type:FETCH_QUESTIONS,
        payload:questions
    })
}

export const fetchUser= user=> dispatch =>{
    dispatch({
        type:FETCH_USER,
        payload:user
    })
}

export const fetchQuestion= ques=> dispatch =>{
    dispatch({
        type:FETCH_QUESTION,
        payload:ques
    })
}

export const toggleState= (state) => dispatch =>{
    dispatch({
        type:TOGGLE_BUTTONS,
        payload:state
    })
}


export const anotherToggleState= (state) => dispatch =>{
    dispatch({
        type:TOGGLE_BUTTONS,
        payload:state
    })
}


export const fetchSession = (session) => dispatch =>{
    dispatch({
        type:FETCH_SESSION,
        payload:session
    })
}

export const setNewGame = () => dispatch => {
    dispatch({
        type:NEW_GAME,
        payload:""
    })
} 

