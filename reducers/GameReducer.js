import {
  CONNECT_TO_GAME,
  SAVE_SOCKET,
  FETCH_QUESTION,
  FETCH_USER,
  FETCH_QUESTIONS,
  TOGGLE_BUTTONS,
  ANOTHER_TOGGLE,
  FETCH_SESSION,
  NEW_GAME
} from "../types";

const initialState = {
  user: {},
  game: {},
  questions: [
    {
      __v: 0,
      _id: "5d0ce9c1254f2616b5a8489a",
      answers: [
        {
          __v: 0,
          _id: "5d0ce991254f2616b5a84898",
          correct: false,
          text: "Да"
        },
        {
          __v: 0,
          _id: "5d0ce9ab254f2616b5a84899",
          correct: true,
          text: "Нет"
        }
      ],
      link:
        "https://storage.oblako.kz/v1/AUTH_27a7be1b8a7a4a53a0ef133e4d3a6717/kinoplay-storage/alejandro-gonzalez-17189-unsplash.jpg",
      pause_timeout: 5000,
      question_timeout: 20000,
      result_timeout: 2000,
      text: "Танос родной отец Небулы?",
      type: "YES/NO"
    },
    {
      __v: 0,
      _id: "5d0cebdf2471276dd971d64d",
      answers: [
        {
          __v: 0,
          _id: "5d0ce991254f2616b5a84898",
          correct: false,
          text: "Да"
        },
        {
          __v: 0,
          _id: "5d0ce9ab254f2616b5a84899",
          correct: true,
          text: "Нет"
        }
      ],
      link:
        "https://storage.oblako.kz/v1/AUTH_27a7be1b8a7a4a53a0ef133e4d3a6717/kinoplay-storage/anders-jilden-307322-unsplash.jpg",
      pause_timeout: 5000,
      question_timeout: 20000,
      result_timeout: 2000,
      text: "Главный герой фильма Нархоз, умер ли он в конце?",
      type: "YES/NO"
    },
    {
      __v: 0,
      _id: "5d0cea1b254f2616b5a8489d",
      answers: [
        {
          __v: 0,
          _id: "5d0ce9ee254f2616b5a8489b",
          correct: true,
          text: "Да"
        },
        {
          __v: 0,
          _id: "5d0cea07254f2616b5a8489c",
          correct: false,
          text: "Нет"
        }
      ],
      link:
        "https://storage.oblako.kz/v1/AUTH_27a7be1b8a7a4a53a0ef133e4d3a6717/kinoplay-storage/anna-wangler-329988-unsplash.jpg",
      pause_timeout: 5000,
      question_timeout: 20000,
      result_timeout: 2000,
      text:
        "Между первой и второй частью фильма “Хэллоуин” прошло ровно 40 лет?",
      type: "YES/NO"
    },
    {
      __v: 0,
      _id: "5d0cea30254f2616b5a8489e",
      answers: [
        {
          __v: 0,
          _id: "5d0ce9ee254f2616b5a8489b",
          correct: true,
          text: "Да"
        },
        {
          __v: 0,
          _id: "5d0cea07254f2616b5a8489c",
          correct: false,
          text: "Нет"
        }
      ],
      link:
        "https://storage.oblako.kz/v1/AUTH_27a7be1b8a7a4a53a0ef133e4d3a6717/kinoplay-storage/annie-spratt-51434-unsplash.jpg",
      pause_timeout: 5000,
      question_timeout: 20000,
      result_timeout: 2000,
      text:
        "Главным инициатором побега из зоопарка из мультфильма Мадагаскар был Мэлмон?",
      type: "YES/NO"
    }
  ],
  question: {
    question: {
      __v: 0,
      _id: "5d0cea30254f2616b5a8489e",
      answers: [
        {
          __v: 0,
          _id: "5d0ce9ee254f2616b5a8489b",
          correct: true,
          text: "Да"
        },
        {
          __v: 0,
          _id: "5d0cea07254f2616b5a8489c",
          correct: false,
          text: "Нет"
        }
      ],
      link:
        "https://storage.oblako.kz/v1/AUTH_27a7be1b8a7a4a53a0ef133e4d3a6717/kinoplay-storage/annie-spratt-51434-unsplash.jpg",
      pause_timeout: 5000,
      question_timeout: 20000,
      result_timeout: 2000,
      text:
        "Главным инициатором побега из зоопарка из мультфильма Мадагаскар был Мэлмон?",
      type: "YES/NO"
    }
  },
  toggle: "",
  "session":{
    "participants":4,
    "users":[
        {
            "score":5982,
            "rating":0,
            "correct_answer_amount":10,
            "answers":[
                {
                    "point":0,
                    "_id":"5d25e8c4353980435da61be7",
                    "quiz_user":"5d0fa78e159a8a19bf4670ea",
                    "question":"5d25ba1ef9dc743c161bff82",
                    "answer":"5d25ba1ef9dc743c161bff83",
                    "__v":0
                },
                {
                    "point":624,
                    "_id":"5d25e8d3353980435da61bf2",
                    "quiz_user":"5d0fa78e159a8a19bf4670ea",
                    "question":"5d25ba1ef9dc743c161bff8c",
                    "answer":"5d25ba1ef9dc743c161bff90",
                    "__v":0
                },
                {
                    "point":632,
                    "_id":"5d25e8da353980435da61bf6",
                    "quiz_user":"5d0fa78e159a8a19bf4670ea",
                    "question":"5d25ba1ef9dc743c161bff91",
                    "answer":"5d25ba1ef9dc743c161bff94",
                    "__v":0
                },
                {
                    "point":518,
                    "_id":"5d25e8eb353980435da61bfd",
                    "quiz_user":"5d0fa78e159a8a19bf4670ea",
                    "question":"5d25ba1ef9dc743c161bff9b",
                    "answer":"5d25ba1ef9dc743c161bff9c",
                    "__v":0
                },
                {
                    "point":623,
                    "_id":"5d25e8f0353980435da61bff",
                    "quiz_user":"5d0fa78e159a8a19bf4670ea",
                    "question":"5d25ba1ef9dc743c161bffa0",
                    "answer":"5d25ba1ef9dc743c161bffa3",
                    "__v":0
                },
                {
                    "point":0,
                    "_id":"5d25e8fa353980435da61c05",
                    "quiz_user":"5d0fa78e159a8a19bf4670ea",
                    "question":"5d25ba1ef9dc743c161bffa5",
                    "answer":"5d25ba1ef9dc743c161bffa6",
                    "__v":0
                },
                {
                    "point":498,
                    "_id":"5d25e901353980435da61c09",
                    "quiz_user":"5d0fa78e159a8a19bf4670ea",
                    "question":"5d25ba1ef9dc743c161bffaa",
                    "answer":"5d25ba1ef9dc743c161bffab",
                    "__v":0
                },
                {
                    "point":692,
                    "_id":"5d25e905353980435da61c0b",
                    "quiz_user":"5d0fa78e159a8a19bf4670ea",
                    "question":"5d25ba1ef9dc743c161bffaf",
                    "answer":"5d25ba1ef9dc743c161bffb1",
                    "__v":0
                },
                {
                    "point":639,
                    "_id":"5d25e90d353980435da61c10",
                    "quiz_user":"5d0fa78e159a8a19bf4670ea",
                    "question":"5d25ba1ef9dc743c161bffb4",
                    "answer":"5d25ba1ef9dc743c161bffb7",
                    "__v":0
                },
                {
                    "point":579,
                    "_id":"5d25e915353980435da61c14",
                    "quiz_user":"5d0fa78e159a8a19bf4670ea",
                    "question":"5d25ba1ef9dc743c161bffb9",
                    "answer":"5d25ba1ef9dc743c161bffbd",
                    "__v":0
                },
                {
                    "point":643,
                    "_id":"5d25e91c353980435da61c17",
                    "quiz_user":"5d0fa78e159a8a19bf4670ea",
                    "question":"5d25ba1ef9dc743c161bffbe",
                    "answer":"5d25ba1ef9dc743c161bffbf",
                    "__v":0
                },
                {
                    "point":534,
                    "_id":"5d25e924353980435da61c1d",
                    "quiz_user":"5d0fa78e159a8a19bf4670ea",
                    "question":"5d25ba1ef9dc743c161bffc3",
                    "answer":"5d25ba1ef9dc743c161bffc5",
                    "__v":0
                }
            ],
            "_id":"5d25e88d353980435da61bdd",
            "user":{
                "statistics":{
                    "balance":0,
                    "game_amount":0,
                    "top_games":0
                },
                "username":"ASDSADSAD",
                "email":"la.dehram@gmail.com",
                "gender":"MALE",
                "age":null,
                "city":1,
                "type":"USER",
                "code":null,
                "_id":"5d0fa78e159a8a19bf4670ea",
                "phone":"+77786210749",
                "password":"+AG+8FIQcwLx0YjCaheQoA==$nDT5jas4KKJQ+27HFhbbpadBgRRdL6ya8BNSKZNJ69ub5zA6rbnX7CWKoCOR1V6VEHjyJrKVqfMOALnnZnFRZA==",
                "token":"1d3c600e7247a0588c7aef8779ba92f8bb2af9a9dea931dca833d5810ef57b6c",
                "__v":0
            },
            "__v":12
        },
        {
            "score":491,
            "rating":0,
            "correct_answer_amount":1,
            "answers":[
                {
                    "point":0,
                    "_id":"5d25e8c5353980435da61bec",
                    "quiz_user":"5d25b390a9328a4dfac617a8",
                    "question":"5d25ba1ef9dc743c161bff82",
                    "answer":"5d25ba1ef9dc743c161bff84",
                    "__v":0
                },
                {
                    "point":0,
                    "_id":"5d25e8d3353980435da61bf0",
                    "quiz_user":"5d25b390a9328a4dfac617a8",
                    "question":"5d25ba1ef9dc743c161bff8c",
                    "answer":"5d25ba1ef9dc743c161bff8e",
                    "__v":0
                },
                {
                    "point":0,
                    "_id":"5d25e8da353980435da61bf4",
                    "quiz_user":"5d25b390a9328a4dfac617a8",
                    "question":"5d25ba1ef9dc743c161bff91",
                    "answer":"5d25ba1ef9dc743c161bff93",
                    "__v":0
                },
                {
                    "point":0,
                    "_id":"5d25e8e1353980435da61bf8",
                    "quiz_user":"5d25b390a9328a4dfac617a8",
                    "question":"5d25ba1ef9dc743c161bff96",
                    "answer":"5d25ba1ef9dc743c161bff98",
                    "__v":0
                },
                {
                    "point":0,
                    "_id":"5d25e8e9353980435da61bfb",
                    "quiz_user":"5d25b390a9328a4dfac617a8",
                    "question":"5d25ba1ef9dc743c161bff9b",
                    "answer":"5d25ba1ef9dc743c161bff9e",
                    "__v":0
                },
                {
                    "point":491,
                    "_id":"5d25e8f2353980435da61c01",
                    "quiz_user":"5d25b390a9328a4dfac617a8",
                    "question":"5d25ba1ef9dc743c161bffa0",
                    "answer":"5d25ba1ef9dc743c161bffa3",
                    "__v":0
                },
                {
                    "point":0,
                    "_id":"5d25e8f8353980435da61c04",
                    "quiz_user":"5d25b390a9328a4dfac617a8",
                    "question":"5d25ba1ef9dc743c161bffa5",
                    "answer":"5d25ba1ef9dc743c161bffa6",
                    "__v":0
                },
                {
                    "point":0,
                    "_id":"5d25e900353980435da61c08",
                    "quiz_user":"5d25b390a9328a4dfac617a8",
                    "question":"5d25ba1ef9dc743c161bffaa",
                    "answer":"5d25ba1ef9dc743c161bffac",
                    "__v":0
                },
                {
                    "point":0,
                    "_id":"5d25e905353980435da61c0c",
                    "quiz_user":"5d25b390a9328a4dfac617a8",
                    "question":"5d25ba1ef9dc743c161bffaf",
                    "answer":"5d25ba1ef9dc743c161bffb0",
                    "__v":0
                },
                {
                    "point":0,
                    "_id":"5d25e90d353980435da61c0f",
                    "quiz_user":"5d25b390a9328a4dfac617a8",
                    "question":"5d25ba1ef9dc743c161bffb4",
                    "answer":"5d25ba1ef9dc743c161bffb6",
                    "__v":0
                },
                {
                    "point":0,
                    "_id":"5d25e915353980435da61c13",
                    "quiz_user":"5d25b390a9328a4dfac617a8",
                    "question":"5d25ba1ef9dc743c161bffb9",
                    "answer":"5d25ba1ef9dc743c161bffba",
                    "__v":0
                },
                {
                    "point":0,
                    "_id":"5d25e91c353980435da61c18",
                    "quiz_user":"5d25b390a9328a4dfac617a8",
                    "question":"5d25ba1ef9dc743c161bffbe",
                    "answer":"5d25ba1ef9dc743c161bffc1",
                    "__v":0
                },
                {
                    "point":0,
                    "_id":"5d25e924353980435da61c1c",
                    "quiz_user":"5d25b390a9328a4dfac617a8",
                    "question":"5d25ba1ef9dc743c161bffc3",
                    "answer":"5d25ba1ef9dc743c161bffc4",
                    "__v":0
                }
            ],
            "_id":"5d25e896353980435da61bdf",
            "user":{
                "statistics":{
                    "balance":0,
                    "game_amount":0,
                    "top_games":0
                },
                "username":"Ktirik",
                "email":null,
                "gender":"MALE",
                "age":null,
                "city":null,
                "type":"USER",
                "code":null,
                "_id":"5d25b390a9328a4dfac617a8",
                "phone":"+78555851554",
                "__v":0,
                "token":"a006633858a9c0c5be9f1d23120bf9e705c3ff82cabb5b1b5a1ef1f184a23a6a"
            },
            "__v":13
        },
        {
            "score":7798,
            "rating":0,
            "correct_answer_amount":12,
            "answers":[
                {
                    "point":652,
                    "_id":"5d25e8c4353980435da61be9",
                    "quiz_user":"5d1e435b18c28917966242dd",
                    "question":"5d25ba1ef9dc743c161bff82",
                    "answer":"5d25ba1ef9dc743c161bff85",
                    "__v":0
                },
                {
                    "point":705,
                    "_id":"5d25e8d2353980435da61bef",
                    "quiz_user":"5d1e435b18c28917966242dd",
                    "question":"5d25ba1ef9dc743c161bff8c",
                    "answer":"5d25ba1ef9dc743c161bff90",
                    "__v":0
                },
                {
                    "point":690,
                    "_id":"5d25e8da353980435da61bf3",
                    "quiz_user":"5d1e435b18c28917966242dd",
                    "question":"5d25ba1ef9dc743c161bff91",
                    "answer":"5d25ba1ef9dc743c161bff94",
                    "__v":0
                },
                {
                    "point":678,
                    "_id":"5d25e8e1353980435da61bf7",
                    "quiz_user":"5d1e435b18c28917966242dd",
                    "question":"5d25ba1ef9dc743c161bff96",
                    "answer":"5d25ba1ef9dc743c161bff9a",
                    "__v":0
                },
                {
                    "point":662,
                    "_id":"5d25e8e8353980435da61bfa",
                    "quiz_user":"5d1e435b18c28917966242dd",
                    "question":"5d25ba1ef9dc743c161bff9b",
                    "answer":"5d25ba1ef9dc743c161bff9c",
                    "__v":0
                },
                {
                    "point":518,
                    "_id":"5d25e8f2353980435da61c00",
                    "quiz_user":"5d1e435b18c28917966242dd",
                    "question":"5d25ba1ef9dc743c161bffa0",
                    "answer":"5d25ba1ef9dc743c161bffa3",
                    "__v":0
                },
                {
                    "point":694,
                    "_id":"5d25e8f7353980435da61c02",
                    "quiz_user":"5d1e435b18c28917966242dd",
                    "question":"5d25ba1ef9dc743c161bffa5",
                    "answer":"5d25ba1ef9dc743c161bffa9",
                    "__v":0
                },
                {
                    "point":556,
                    "_id":"5d25e900353980435da61c07",
                    "quiz_user":"5d1e435b18c28917966242dd",
                    "question":"5d25ba1ef9dc743c161bffaa",
                    "answer":"5d25ba1ef9dc743c161bffab",
                    "__v":0
                },
                {
                    "point":710,
                    "_id":"5d25e905353980435da61c0a",
                    "quiz_user":"5d1e435b18c28917966242dd",
                    "question":"5d25ba1ef9dc743c161bffaf",
                    "answer":"5d25ba1ef9dc743c161bffb1",
                    "__v":0
                },
                {
                    "point":680,
                    "_id":"5d25e90d353980435da61c0e",
                    "quiz_user":"5d1e435b18c28917966242dd",
                    "question":"5d25ba1ef9dc743c161bffb4",
                    "answer":"5d25ba1ef9dc743c161bffb7",
                    "__v":0
                },
                {
                    "point":0,
                    "_id":"5d25e915353980435da61c12",
                    "quiz_user":"5d1e435b18c28917966242dd",
                    "question":"5d25ba1ef9dc743c161bffb9",
                    "answer":"5d25ba1ef9dc743c161bffbb",
                    "__v":0
                },
                {
                    "point":659,
                    "_id":"5d25e91b353980435da61c16",
                    "quiz_user":"5d1e435b18c28917966242dd",
                    "question":"5d25ba1ef9dc743c161bffbe",
                    "answer":"5d25ba1ef9dc743c161bffbf",
                    "__v":0
                },
                {
                    "point":594,
                    "_id":"5d25e924353980435da61c1b",
                    "quiz_user":"5d1e435b18c28917966242dd",
                    "question":"5d25ba1ef9dc743c161bffc3",
                    "answer":"5d25ba1ef9dc743c161bffc5",
                    "__v":0
                }
            ],
            "_id":"5d25e897353980435da61be1",
            "user":{
                "statistics":{
                    "balance":0,
                    "game_amount":0,
                    "top_games":0
                },
                "username":"Dghtfgj",
                "email":null,
                "gender":"MALE",
                "age":null,
                "city":null,
                "type":"USER",
                "code":null,
                "_id":"5d1e435b18c28917966242dd",
                "phone":"+77021988751",
                "__v":0,
                "token":"88aff72e30fb9bf70f84ec0d3b18f2d0823a3e267eb33f9de8e9a2181ff49c68"
            },
            "__v":13
        },
        {
            "score":9033,
            "rating":0,
            "correct_answer_amount":15,
            "answers":[
                {
                    "point":626,
                    "_id":"5d25e8bd353980435da61be5",
                    "quiz_user":"5d20bc2b18c2891796665fbb",
                    "question":"5d25ba1ef9dc743c161bff7d",
                    "answer":"5d25ba1ef9dc743c161bff7f",
                    "__v":0
                },
                {
                    "point":627,
                    "_id":"5d25e8c5353980435da61beb",
                    "quiz_user":"5d20bc2b18c2891796665fbb",
                    "question":"5d25ba1ef9dc743c161bff82",
                    "answer":"5d25ba1ef9dc743c161bff85",
                    "__v":0
                },
                {
                    "point":583,
                    "_id":"5d25e8cd353980435da61bee",
                    "quiz_user":"5d20bc2b18c2891796665fbb",
                    "question":"5d25ba1ef9dc743c161bff87",
                    "answer":"5d25ba1ef9dc743c161bff88",
                    "__v":0
                },
                {
                    "point":663,
                    "_id":"5d25e8d3353980435da61bf1",
                    "quiz_user":"5d20bc2b18c2891796665fbb",
                    "question":"5d25ba1ef9dc743c161bff8c",
                    "answer":"5d25ba1ef9dc743c161bff90",
                    "__v":0
                },
                {
                    "point":638,
                    "_id":"5d25e8da353980435da61bf5",
                    "quiz_user":"5d20bc2b18c2891796665fbb",
                    "question":"5d25ba1ef9dc743c161bff91",
                    "answer":"5d25ba1ef9dc743c161bff94",
                    "__v":0
                },
                {
                    "point":635,
                    "_id":"5d25e8e2353980435da61bf9",
                    "quiz_user":"5d20bc2b18c2891796665fbb",
                    "question":"5d25ba1ef9dc743c161bff96",
                    "answer":"5d25ba1ef9dc743c161bff9a",
                    "__v":0
                },
                {
                    "point":522,
                    "_id":"5d25e8ea353980435da61bfc",
                    "quiz_user":"5d20bc2b18c2891796665fbb",
                    "question":"5d25ba1ef9dc743c161bff9b",
                    "answer":"5d25ba1ef9dc743c161bff9c",
                    "__v":0
                },
                {
                    "point":658,
                    "_id":"5d25e8f0353980435da61bfe",
                    "quiz_user":"5d20bc2b18c2891796665fbb",
                    "question":"5d25ba1ef9dc743c161bffa0",
                    "answer":"5d25ba1ef9dc743c161bffa3",
                    "__v":0
                },
                {
                    "point":670,
                    "_id":"5d25e8f7353980435da61c03",
                    "quiz_user":"5d20bc2b18c2891796665fbb",
                    "question":"5d25ba1ef9dc743c161bffa5",
                    "answer":"5d25ba1ef9dc743c161bffa9",
                    "__v":0
                },
                {
                    "point":611,
                    "_id":"5d25e8ff353980435da61c06",
                    "quiz_user":"5d20bc2b18c2891796665fbb",
                    "question":"5d25ba1ef9dc743c161bffaa",
                    "answer":"5d25ba1ef9dc743c161bffab",
                    "__v":0
                },
                {
                    "point":585,
                    "_id":"5d25e907353980435da61c0d",
                    "quiz_user":"5d20bc2b18c2891796665fbb",
                    "question":"5d25ba1ef9dc743c161bffaf",
                    "answer":"5d25ba1ef9dc743c161bffb1",
                    "__v":0
                },
                {
                    "point":578,
                    "_id":"5d25e90e353980435da61c11",
                    "quiz_user":"5d20bc2b18c2891796665fbb",
                    "question":"5d25ba1ef9dc743c161bffb4",
                    "answer":"5d25ba1ef9dc743c161bffb7",
                    "__v":0
                },
                {
                    "point":485,
                    "_id":"5d25e917353980435da61c15",
                    "quiz_user":"5d20bc2b18c2891796665fbb",
                    "question":"5d25ba1ef9dc743c161bffb9",
                    "answer":"5d25ba1ef9dc743c161bffbd",
                    "__v":0
                },
                {
                    "point":555,
                    "_id":"5d25e91d353980435da61c19",
                    "quiz_user":"5d20bc2b18c2891796665fbb",
                    "question":"5d25ba1ef9dc743c161bffbe",
                    "answer":"5d25ba1ef9dc743c161bffbf",
                    "__v":0
                },
                {
                    "point":597,
                    "_id":"5d25e924353980435da61c1a",
                    "quiz_user":"5d20bc2b18c2891796665fbb",
                    "question":"5d25ba1ef9dc743c161bffc3",
                    "answer":"5d25ba1ef9dc743c161bffc5",
                    "__v":0
                }
            ],
            "_id":"5d25e8a1353980435da61be3",
            "user":{
                "statistics":{
                    "balance":0,
                    "game_amount":0,
                    "top_games":0
                },
                "username":"Amirkaaa",
                "email":null,
                "gender":"MALE",
                "age":null,
                "city":null,
                "type":"USER",
                "code":null,
                "_id":"5d20bc2b18c2891796665fbb",
                "phone":"+77757722135",
                "__v":0,
                "token":"c72a50505120df78203ac4514972da47924c3f47aadabd1c467211e46bbd7414"
            },
            "__v":15
        }
    ],
    "status":"FINISHED",
    "_id":"5d25e883353980435da61bdc",
    "quiz":{
        "type":"QUIZ",
        "questions":[
            {
                "answers":[
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bff7e",
                        "text":"СкуБи Ду",
                        "__v":0
                    },
                    {
                        "correct":true,
                        "_id":"5d25ba1ef9dc743c161bff7f",
                        "text":"Сэм",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bff80",
                        "text":"Ричард",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bff81",
                        "text":"Хатико",
                        "__v":0
                    }
                ],
                "question_timeout":20000,
                "pause_timeout":5000,
                "result_timeout":2000,
                "type":"QUIZ",
                "_id":"5d25ba1ef9dc743c161bff7d",
                "text":"Какая кличка была у пса в фильме “Я легенда”?",
                "link":"https://storage.oblako.kz/v1/AUTH_27a7be1b8a7a4a53a0ef133e4d3a6717/kinoplay-storage/quiz%2F1.jpg",
                "__v":0
            },
            {
                "answers":[
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bff83",
                        "text":"Джон Кеннеди",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bff84",
                        "text":"Далай-Лама",
                        "__v":0
                    },
                    {
                        "correct":true,
                        "_id":"5d25ba1ef9dc743c161bff85",
                        "text":"Мэрилин Монро",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bff86",
                        "text":"Саддам Хусейн",
                        "__v":0
                    }
                ],
                "question_timeout":20000,
                "pause_timeout":5000,
                "result_timeout":2000,
                "type":"QUIZ",
                "_id":"5d25ba1ef9dc743c161bff82",
                "text":"Кто из знаменитостей был нарисован на картине у Энди Дюфрейна из фильма “Побег из Шоушенка”?",
                "link":"https://storage.oblako.kz/v1/AUTH_27a7be1b8a7a4a53a0ef133e4d3a6717/kinoplay-storage/quiz%2F2.jpg",
                "__v":0
            },
            {
                "answers":[
                    {
                        "correct":true,
                        "_id":"5d25ba1ef9dc743c161bff88",
                        "text":"Мышонок",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bff89",
                        "text":"Заяц",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bff8a",
                        "text":"Собака",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bff8b",
                        "text":"Кота",
                        "__v":0
                    }
                ],
                "question_timeout":20000,
                "pause_timeout":5000,
                "result_timeout":2000,
                "type":"QUIZ",
                "_id":"5d25ba1ef9dc743c161bff87",
                "text":"Какой питомец был у одного из главных героя фильма “Зеленая Миля” Делакруа?",
                "link":"https://storage.oblako.kz/v1/AUTH_27a7be1b8a7a4a53a0ef133e4d3a6717/kinoplay-storage/quiz%2F3.jpeg",
                "__v":0
            },
            {
                "answers":[
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bff8d",
                        "text":"В горах",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bff8e",
                        "text":"У моря",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bff8f",
                        "text":"На равнине",
                        "__v":0
                    },
                    {
                        "correct":true,
                        "_id":"5d25ba1ef9dc743c161bff90",
                        "text":"Под корнем древа",
                        "__v":0
                    }
                ],
                "question_timeout":20000,
                "pause_timeout":5000,
                "result_timeout":2000,
                "type":"QUIZ",
                "_id":"5d25ba1ef9dc743c161bff8c",
                "text":"Где находится база поселенцев на планете Пандоре в фильме “Аватар”",
                "link":"https://storage.oblako.kz/v1/AUTH_27a7be1b8a7a4a53a0ef133e4d3a6717/kinoplay-storage/quiz%2F4.jpg",
                "__v":0
            },
            {
                "answers":[
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bff92",
                        "text":"Пистолет",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bff93",
                        "text":"Зонтик",
                        "__v":0
                    },
                    {
                        "correct":true,
                        "_id":"5d25ba1ef9dc743c161bff94",
                        "text":"Самодельная Юла",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bff95",
                        "text":"Платок",
                        "__v":0
                    }
                ],
                "question_timeout":20000,
                "pause_timeout":5000,
                "result_timeout":2000,
                "type":"QUIZ",
                "_id":"5d25ba1ef9dc743c161bff91",
                "text":"Какой вещью пользовался главный герой фильма “Начало”, для того чтобы распознать во сне он или нет?",
                "link":"https://storage.oblako.kz/v1/AUTH_27a7be1b8a7a4a53a0ef133e4d3a6717/kinoplay-storage/quiz%2F5.jpg",
                "__v":0
            },
            {
                "answers":[
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bff97",
                        "text":"Теннис",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bff98",
                        "text":"Спортивная ходьба",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bff99",
                        "text":"Плавание",
                        "__v":0
                    },
                    {
                        "correct":true,
                        "_id":"5d25ba1ef9dc743c161bff9a",
                        "text":"Американский Футбол",
                        "__v":0
                    }
                ],
                "question_timeout":20000,
                "pause_timeout":5000,
                "result_timeout":2000,
                "type":"QUIZ",
                "_id":"5d25ba1ef9dc743c161bff96",
                "text":"Каким спортом занимался Форрест Гамп в молодости?",
                "link":"https://storage.oblako.kz/v1/AUTH_27a7be1b8a7a4a53a0ef133e4d3a6717/kinoplay-storage/quiz%2F6.jpg",
                "__v":0
            },
            {
                "answers":[
                    {
                        "correct":true,
                        "_id":"5d25ba1ef9dc743c161bff9c",
                        "text":"Браавос",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bff9d",
                        "text":"Винтерфелл",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bff9e",
                        "text":"Драконий Камень",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bff9f",
                        "text":"Кварт",
                        "__v":0
                    }
                ],
                "question_timeout":20000,
                "pause_timeout":5000,
                "result_timeout":2000,
                "type":"QUIZ",
                "_id":"5d25ba1ef9dc743c161bff9b",
                "text":"В каком городе Ария обучалась искусству убийства?",
                "link":"https://storage.oblako.kz/v1/AUTH_27a7be1b8a7a4a53a0ef133e4d3a6717/kinoplay-storage/quiz%2F7.jpg",
                "__v":0
            },
            {
                "answers":[
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffa1",
                        "text":"Чернорук",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffa2",
                        "text":"Гулдан",
                        "__v":0
                    },
                    {
                        "correct":true,
                        "_id":"5d25ba1ef9dc743c161bffa3",
                        "text":"Тралл",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffa4",
                        "text":"Медив",
                        "__v":0
                    }
                ],
                "question_timeout":20000,
                "pause_timeout":5000,
                "result_timeout":2000,
                "type":"QUIZ",
                "_id":"5d25ba1ef9dc743c161bffa0",
                "text":"Как звали сына Дуротана главы Орков с фильма “Warcraft”?",
                "link":"https://storage.oblako.kz/v1/AUTH_27a7be1b8a7a4a53a0ef133e4d3a6717/kinoplay-storage/quiz%2F8.jpg",
                "__v":0
            },
            {
                "answers":[
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffa6",
                        "text":"Измайлов",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffa7",
                        "text":"Яковлев",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffa8",
                        "text":"Крис",
                        "__v":0
                    },
                    {
                        "correct":true,
                        "_id":"5d25ba1ef9dc743c161bffa9",
                        "text":"Мухич",
                        "__v":0
                    }
                ],
                "question_timeout":20000,
                "pause_timeout":5000,
                "result_timeout":2000,
                "type":"QUIZ",
                "_id":"5d25ba1ef9dc743c161bffa5",
                "text":"Кто был Мориарти в сериале “Полицейский с рублевки”?",
                "link":"https://storage.oblako.kz/v1/AUTH_27a7be1b8a7a4a53a0ef133e4d3a6717/kinoplay-storage/quiz%2F9.jpg",
                "__v":0
            },
            {
                "answers":[
                    {
                        "correct":true,
                        "_id":"5d25ba1ef9dc743c161bffab",
                        "text":"Бокс",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffac",
                        "text":"Баскетбол",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffad",
                        "text":"Борьба",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffae",
                        "text":"Футбол",
                        "__v":0
                    }
                ],
                "question_timeout":20000,
                "pause_timeout":5000,
                "result_timeout":2000,
                "type":"QUIZ",
                "_id":"5d25ba1ef9dc743c161bffaa",
                "text":"Каким видом спорта занимался Саян из фильма “Рэкетир”?",
                "link":"https://storage.oblako.kz/v1/AUTH_27a7be1b8a7a4a53a0ef133e4d3a6717/kinoplay-storage/quiz%2F10.jpg",
                "__v":0
            },
            {
                "answers":[
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffb0",
                        "text":"Beethoven - Moonlight",
                        "__v":0
                    },
                    {
                        "correct":true,
                        "_id":"5d25ba1ef9dc743c161bffb1",
                        "text":"Earth, Wind and Fire - Boogie Wonderland",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffb2",
                        "text":"Ed Sheeran - Perfect",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffb3",
                        "text":"Bruno Mars- Just the way you are",
                        "__v":0
                    }
                ],
                "question_timeout":20000,
                "pause_timeout":5000,
                "result_timeout":2000,
                "type":"QUIZ",
                "_id":"5d25ba1ef9dc743c161bffaf",
                "text":"Под какую песню Дрисс станцевал на день рождение Филиппа в фильме ”1+1”?",
                "link":"https://storage.oblako.kz/v1/AUTH_27a7be1b8a7a4a53a0ef133e4d3a6717/kinoplay-storage/quiz%2F11.jpg",
                "__v":0
            },
            {
                "answers":[
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffb5",
                        "text":"Фитнес тренер",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffb6",
                        "text":"Актер",
                        "__v":0
                    },
                    {
                        "correct":true,
                        "_id":"5d25ba1ef9dc743c161bffb7",
                        "text":"Пилот",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffb8",
                        "text":"Бортпроводник",
                        "__v":0
                    }
                ],
                "question_timeout":20000,
                "pause_timeout":5000,
                "result_timeout":2000,
                "type":"QUIZ",
                "_id":"5d25ba1ef9dc743c161bffb4",
                "text":"Кем работал бывший парень Гаухар из фильма “Брат или Брак”?",
                "link":"https://storage.oblako.kz/v1/AUTH_27a7be1b8a7a4a53a0ef133e4d3a6717/kinoplay-storage/quiz%2F12.jpg",
                "__v":0
            },
            {
                "answers":[
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffba",
                        "text":"Ричард",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffbb",
                        "text":"Альтрон",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffbc",
                        "text":"Питер",
                        "__v":0
                    },
                    {
                        "correct":true,
                        "_id":"5d25ba1ef9dc743c161bffbd",
                        "text":"Джарвис",
                        "__v":0
                    }
                ],
                "question_timeout":20000,
                "pause_timeout":5000,
                "result_timeout":2000,
                "type":"QUIZ",
                "_id":"5d25ba1ef9dc743c161bffb9",
                "text":"Как звали искусственный интеллект, который создал Тони Старк?",
                "link":"https://storage.oblako.kz/v1/AUTH_27a7be1b8a7a4a53a0ef133e4d3a6717/kinoplay-storage/quiz%2F13.jpg",
                "__v":0
            },
            {
                "answers":[
                    {
                        "correct":true,
                        "_id":"5d25ba1ef9dc743c161bffbf",
                        "text":"Роджер Аллерс, Роб Минкофф",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffc0",
                        "text":"Стивен Фрирз",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffc1",
                        "text":"Роберт Земекис",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffc2",
                        "text":"Квентин Тарантино",
                        "__v":0
                    }
                ],
                "question_timeout":20000,
                "pause_timeout":5000,
                "result_timeout":2000,
                "type":"QUIZ",
                "_id":"5d25ba1ef9dc743c161bffbe",
                "text":"Кто был режиссером фильма “Король Лев”?",
                "link":"https://storage.oblako.kz/v1/AUTH_27a7be1b8a7a4a53a0ef133e4d3a6717/kinoplay-storage/quiz%2F14.jpg",
                "__v":0
            },
            {
                "answers":[
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffc4",
                        "text":"Алгабас",
                        "__v":0
                    },
                    {
                        "correct":true,
                        "_id":"5d25ba1ef9dc743c161bffc5",
                        "text":"Жердын быр жеры",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffc6",
                        "text":"Коргалжын",
                        "__v":0
                    },
                    {
                        "correct":false,
                        "_id":"5d25ba1ef9dc743c161bffc7",
                        "text":"Каскелен",
                        "__v":0
                    }
                ],
                "question_timeout":20000,
                "pause_timeout":5000,
                "result_timeout":2000,
                "type":"QUIZ",
                "_id":"5d25ba1ef9dc743c161bffc3",
                "text":"В какой ауыл забрали Сабину?",
                "link":"https://storage.oblako.kz/v1/AUTH_27a7be1b8a7a4a53a0ef133e4d3a6717/kinoplay-storage/quiz%2F15.jpg",
                "__v":0
            }
        ],
        "prepare_timeout":40000,
        "instruction_timeout":14180,
        "start_timeout":5000,
        "question_timeout":5000,
        "pause_timeout":2000,
        "_id":"5d25ba1ef9dc743c161bff7c",
        "name":"New Quiz",
        "expiration_date":"2019-07-10T10:12:46.228Z",
        "__v":0
    },
    "created":"2019-07-10T13:30:43.013Z",
    "last_question":"2019-07-10T13:33:20.354Z",
    "__v":4
},
  state: "scanning"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CONNECT_TO_GAME:
      return {
        ...state,
        user: action.payload
      };
    case FETCH_SESSION:
      console.log(action.payload);
      return {
        ...state,
        session: action.payload
      };
    case FETCH_QUESTIONS:
      return {
        ...state,
        questions: action.payload
      };
    case FETCH_USER:
      return {
        ...state,
        user: action.payload
      };
    case FETCH_QUESTION:
      return {
        ...state,
        question: action.payload
      };
    case TOGGLE_BUTTONS:
      return {
        ...state,
        toggle: action.payload
      };
    case ANOTHER_TOGGLE:
      return {
        ...state,
        anotherToggle: action.payload
      };
    case NEW_GAME:
      return {
        ...state,
        state: "scanning"
      };
    default:
      return {
        ...state
      };
  }
}
