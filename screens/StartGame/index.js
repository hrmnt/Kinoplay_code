import React, { Component } from "react";
import { StyleSheet, SafeAreaView as SF, Dimensions, Alert } from "react-native";
import { getWidth, statusBarHeight } from "../../constants";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  connectToGame,
  fetchQuestions,
  fetchUser,
  toggleState,
  fetchSession,
  fetchQuestion
} from "../../actions/GameAction";
import {
  GAME_STARTED_T,
  BUTTON_PRESSED_T,
  ANSWER_GETTED_T,
  PREVIEW_STARTED,
  ANSWERS_GETTED
} from "../../types";
import io from "socket.io-client";
import StartGameContainer from "./container";
import Game from "../Game";
import QGame from "../QGame";
import HighScore from "../HighScore";
import StoryTelling from "../StoryTelling";
let socket;

class StartGame extends Component {
  constructor(props) {
    super(props);

    // prod
    socket = io.connect("ws://37.18.30.150:3000", {
      query: {
        token: this.props.authReducer.token
      }
    });

    // dev
    // socket = io.connect("ws://192.168.0.100:3000", {
    //   query: {
    //     token: this.props.authReducer.token
    //   }
    // });

    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("error", error => {
      console.log("error", error);
    });

    socket.emit("quiz_session_create");

    // connect
    socket.on("quiz_session_connect", data => {
      console.log("quiz_session_connect", data.body);
      try{

        if (data.body.quizSession.quiz.type === "STORYTELLING") {
          const cAnswers = {
            firstAnswer: { answer: data.body.quizSession.quiz.questions[0] },
            secondAnswer: { answer: data.body.quizSession.quiz.questions[1] }
          };
          this.setState({
            gameState: "START",
            loading: true,
  
            cAnswers,
            gameType: data.body.quizSession.quiz.type,
            pauseTimeout: data.body.quizSession.quiz.pause_timeout,
            questionTimeout: data.body.quizSession.quiz.question_timeout,
            quizSession: data.body.quizSession,
            user:data.body.quizUser
          });
        } else {
          this.setState({
            gameState: "START",
            loading: true,
            gameType: data.body.quizSession.quiz.type,
            pauseTimeout: data.body.quizSession.quiz.pause_timeout,
            questionTimeout: data.body.quizSession.quiz.question_timeout,
            quizSession: data.body.quizSession,
            user:data.body.quizUser
          });
        }
        socket.emit("quiz_session_get", {
          quizSessionId: data.body.quizSession._id
        });
        this.props.fetchUser(data.body.quizUser);
      }
      catch(e){
        Alert.alert(
          "Предупреждение",
          "Данный код не действителен",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }

    });
    // ---------

    //

    // start delay
    socket.on("quiz_session_start", data => {
      this.setState({
        loading: false
      });
    });
    // ---------

    // getQuestions
    socket.on("quiz_session_get", data => {
      // console.log(data.body);
      // const users = data.body.quizSession.quiz.users;
      this.setState({
        users: data.body.quizSession.quiz.users,
        session: data.body.quizSession
      });
      if (this.state.questions.length < 1) {
        this.setState({
          questions: data.body.quizSession.quiz.questions
        });
      }
      if (data.body.quizSession.status === "FINISHED") {
        this.props.fetchSession(data.body.quizSession);
      }
    });
    // ---------

    // getQuestion
    socket.on("quiz_session_question", data => {
      console.log("quiz_session_question", data.body);
      this.props.fetchQuestion(data.body);
      this.setState({
        question: data.body
      });
      if (this.state.gameType === "STORYTELLING") {
        if (this.props.gameReducer.toggle !== PREVIEW_STARTED) {
          this.setState({
            cState: "QUESTION"
          });
          this.props.toggleState(PREVIEW_STARTED);
        }
        // 192.168.0.100
        return;
      }
      if (this.props.gameReducer.toggle !== GAME_STARTED_T) {
        this.props.toggleState(GAME_STARTED_T);
        this.setState({
          rightAnswer: {
            correct: false,
            text: "",
            __v: 0,
            _id: ""
          }
        });
      }
    });
    // --------

    // st qas

    socket.on("quiz_session_answer", data => {
      console.log("quiz_session_answer", data.body);
      if (this.props.gameReducer.toggle !== ANSWERS_GETTED) {
        this.setState({
          cAnswers: data.body.answer,
          cState: "ANSWERS",
          resultTimeout: data.body.resultTimeout,
          questionTimeout: data.body.pauseTimeout
        });
        this.props.toggleState(ANSWERS_GETTED);
        return;
      }
    });
    // --------

    // getQuestionAnswer
    socket.on("quiz_session_answer_result", data => {
      if (this.state.gameType === "STORYTELLING") {
        this.setState({
          cAnswers: data.body.answer
        });
        if (this.props.gameReducer.toggle !== ANSWER_GETTED_T) {
          console.log("IF");
          this.props.toggleState(ANSWER_GETTED_T);
        }
      } else {
        this.setState({
          rightAnswer: data.body.answer
        });
        if (this.props.gameReducer.toggle !== ANSWER_GETTED_T) {
          console.log("IF");
          this.props.toggleState(ANSWER_GETTED_T);
        }
        socket.emit("quiz_user_get_score", {
          quizUserId: this.props.gameReducer.user._id
        });
      }
    });

    socket.on("quiz_user_score_result", data => {
      this.setState({
        user:data.body.quizUser
      })
      this.props.fetchUser(data.body.quizUser);
    });

    socket.on("quiz_session_finished", data => {
      // console.log(data);
      socket.emit("quiz_session_get", {
        quizSessionId: data.body.quizSession._id
      });
      setTimeout(() => {
        this.setState({
          gameState: "FINISHED"
        });
      }, 1000);
    });

    // --------
    this.state = {
      gameState: "scanning",
      question: {},
      questions: [],
      rightAnswer: {
        correct: false,
        text: "",
        __v: 0,
        _id: ""
      },
      questionTimeout: 0,
      resultTimeout: 0,
      finish: {},
      session: {},
      users: [],
      pauseTimeout: 0,
      cState: "",
      cAnswers: {
        firstAnswer: {
          answer: {
            preview: ""
          }
        },
        secondAnswer: {
          answer: {
            preview: ""
          }
        }
      },
      loading: false,
      mount: false,
      user:{}
    };
  }

  onHamburger = () => {
    // console.log("drawer");
    this.props.navigation.openDrawer();
  };

  onSelect = answer => {
    console.log(answer);
    const { gameReducer } = this.props;
    const { user } = gameReducer;
    console.log({
      quizSessionId: this.state.quizSession._id,
      quizUserId: user._id,
      questionId: this.state.question.question._id,
      answerId:
        this.state.gameType === "STORYTELLING" ? answer.answer._id : answer._id
    });

    socket.emit("quiz_session_answer", {
      quizSessionId: this.state.quizSession._id,
      quizUserId: user._id,
      questionId: this.state.question.question._id,
      answerId:
        this.state.gameType === "STORYTELLING" ? answer.answer._id : answer._id
    });

    if (this.props.gameReducer.toggle !== BUTTON_PRESSED_T) {
      this.props.toggleState(BUTTON_PRESSED_T);
    }
  };

  onBack = () => {
    console.log("ASDASD");
    this.setState({
      gameState: "scanning"
    });
    setTimeout(() => {
      this.props.navigation.goBack();
    }, 200);
  };
  componentDidMount() {
    console.log("MOUNTED");
  }

  componentWillUnmount() {
    console.log("UNMOUNTED");
    this.setState({
      gameState: "scanning",
      question: {},
      questions: [],
      rightAnswer: {
        correct: false,
        text: "",
        __v: 0,
        _id: ""
      },
      questionTimeout: 0,
      finish: {},
      session: {},
      users: [],
      pauseTimeout: 0,
      cState: "",
      cAnswers: {}
    });
  }

  render() {
    switch (this.state.gameState) {
      case "scanning":
        return (
          <StartGameContainer
            onBack={() => this.onBack()}
            socket={socket}
            onHamburger={this.onHamburger}
          />
        );
      // case "loading":
      //   return <Loading socket={socket} />;
      case "START":
        switch (this.state.gameType) {
          case "YES/NO":
            return (
              <Game
                loading={this.state.loading}
                user={this.props.gameReducer.user}
                onSelect={this.onSelect}
                onBack={this.onBack}
                questions={this.state.questions}
                rightAnswer={this.state.rightAnswer}
                question={this.state.question}
                {...this.state.state}
              />
            );
          case "QUIZ": {
            // console.log(this.props.questions);
            return (
              <QGame
                loading={this.state.loading}
                questions={this.state.questions}
                rightAnswer={this.state.rightAnswer}
                user={this.props.gameReducer.user}
                onSelect={this.onSelect}
                onBack={this.onBack}
                {...this.state}
              />
            );
          }
          case "STORYTELLING":
            return (
              <StoryTelling
                user={this.props.gameReducer.user}
                onSelect={this.onSelect}
                onBack={this.onBack}
                cAnswers={this.state.cAnswers}
                resultTimeout={this.state.resultTimeout}
                questionTimeout={this.state.questionTimeout}
                {...this.state.state}
              />
            );
        }

      case "FINISHED":
        return <HighScore user={this.state.user} session ={this.state.session} onBack={() => this.onBack()} />;
    }
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
    flex: 1,
    paddingBottom: -20
  },
  pList: {
    flex: 1,
    alignItems: "center",
    position: "relative",

    justifyContent: "space-around",
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
const mapStateToProps = ({ authReducer, gameReducer, errorsReducer }) => {
  return { authReducer, gameReducer, errorsReducer };
};

const mapDispatchToProps = dispatch => ({
  connectToGame: bindActionCreators(connectToGame, dispatch),
  fetchQuestions: bindActionCreators(fetchQuestions, dispatch),
  fetchUser: bindActionCreators(fetchUser, dispatch),
  toggleState: bindActionCreators(toggleState, dispatch),
  fetchSession: bindActionCreators(fetchSession, dispatch),
  fetchQuestion: bindActionCreators(fetchQuestion, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartGame);
