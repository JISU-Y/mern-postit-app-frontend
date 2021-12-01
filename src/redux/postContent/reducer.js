import { READ_POST, ADD_TODO, UPDATE_TODO, DELETE_TODO, ADD_TAG, DELETE_TAG } from "./types"

const initialState = {
  name: "",
  tag: [],
  todos: [],
  position: { x: null, y: null },
}

// state = posts
const postContentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_POST:
      console.log(action.payload) // 일단 edit 상태에 들어간 post의 정보들을 다 가져옴
      return action.payload
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      }
    case UPDATE_TODO:
      console.log(action.payload)
      return {
        ...state,
        todos: state.todos.map((todo) => (todo._id === action.payload.id ? action.payload.todo : todo)),
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
      }
    case ADD_TAG:
      return {
        ...state,
        tag: [...state.tag, action.payload],
      }
    case DELETE_TAG:
      console.log(action.payload)
      return {
        ...state,
        tag: state.tag.filter((tag) => tag !== action.payload),
      }
    default:
      return state
  }
}

export default postContentsReducer
