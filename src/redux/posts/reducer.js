import { FETCH_ALL, CREATE, UPDATE, DELETE } from "./types"

const initialState = {
  posts: [],
}

// state = posts
const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload
    case CREATE:
      return {
        ...state,
        posts: action.payload,
      }
    case UPDATE:
      return state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))
    case DELETE:
      return state.posts.filter((post) => post._id !== action.payload) // payload is _id
    default:
      return state
  }
}

export default postsReducer
