import { READ_TODO, ADD_TODO, UPDATE_TODO, DELETE_TODO, ADD_TAG, UPDATE_TAG, DELETE_TAG } from "./types"

const initialState = {
  name: "",
  tag: [],
  todos: [],
  position: { x: null, y: null },
}

// state = posts
const postContentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_TODO:
      return state
    case ADD_TODO:
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
