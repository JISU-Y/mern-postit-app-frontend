import { READ_POST, ADD_TODO, UPDATE_TODO, DELETE_TODO, ADD_TAG, UPDATE_TAG, DELETE_TAG } from "./types"

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
      console.log(action.payload)
      return {
        ...state,
        todos: [...state.todos, action.payload],
      }
    //   case UPDATE_TODO:
    //     return state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))
    //   case DELETE_TODO:
    //     return {
    //       ...state,
    //       posts: state.posts.filter((post) => post._id !== action.payload),
    //     }
    default:
      return state
  }
}

export default postContentsReducer
