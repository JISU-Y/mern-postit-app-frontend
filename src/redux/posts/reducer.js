import { FETCH_ALL, CREATE, UPDATE, DELETE } from "./types"

const initialState = {
  posts: [
    {
      name: "",
      tag: [],
      todos: [],
      position: { x: null, y: null },
    },
  ],
}

// state = posts
const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload,
      }
    case CREATE:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      }
    case UPDATE:
      console.log(action.payload)
      return {
        ...state,
        posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)),
      }
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      }
    default:
      return state
  }
}

export default postsReducer
