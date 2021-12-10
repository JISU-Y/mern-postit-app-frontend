import { FETCH_ALL, CREATE, UPDATE, DELETE, LOAD_DONE } from "./types"

const initialState = {
  posts: [],
  isLoading: true,
}

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload,
        isLoading: true,
      }
    case CREATE:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      }
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._idL
            ? {
                ...post,
                position: action.payload.position, //
                tag: action.payload.tag,
                todos: action.payload.todos,
              }
            : post
        ),
        isLoading: true,
      }
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      }
    case LOAD_DONE:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}

export default postsReducer
