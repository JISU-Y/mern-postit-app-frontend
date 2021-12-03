import { READ_POST, ADD_TODO, UPDATE_TODO, DELETE_TODO, ADD_TAG, DELETE_TAG, UPDATE_POS, EDIT_DONE } from "./types"

const initialState = {
  name: "",
  tag: [],
  todos: [
    {
      todoText: "",
      todoDone: false,
      tempId: null,
    },
  ],
  position: { x: null, y: null },
  isEdit: false,
}

// state = posts
const postContentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_POST:
      console.log(action.payload) // 일단 edit 상태에 들어간 post의 정보들을 다 가져옴
      return { ...state, ...action.payload, isEdit: true }
    case ADD_TODO:
      console.log(action.payload)
      return {
        ...state,
        todos: [...state.todos, action.payload],
      }
    case UPDATE_TODO:
      console.log(action.payload)
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id
            ? todo._id !== action.payload.id
              ? todo
              : action.payload.todo //
            : todo.tempId !== action.payload.id
            ? todo
            : action.payload.todo
        ),
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => (todo._id ? todo._id !== action.payload : todo.tempId !== action.payload)),
      }
    case ADD_TAG:
      console.log(state.tag)
      console.log(action.payload)
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
    case UPDATE_POS:
      return {
        ...state,
        position: action.payload,
      }
    case EDIT_DONE:
      return initialState
    default:
      return state
  }
}

export default postContentsReducer
