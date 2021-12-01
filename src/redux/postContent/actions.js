import * as api from "../../api"
import { READ_TODO, ADD_TODO, UPDATE_TODO, DELETE_TODO, ADD_TAG, UPDATE_TAG, DELETE_TAG } from "./types"

// action creator
const readTodoAction = () => {
  return {
    type: READ_TODO,
  }
}

export const addTodoAction = (todo) => {
  return {
    type: ADD_TODO,
    payload: todo,
  }
}

export const updateTodoAction = (id, todo) => {
  return {
    type: UPDATE_TODO,
    payload: { id, todo },
  }
}

export const deleteTodoAction = (id) => {
  return {
    type: DELETE_TODO,
    payload: id,
  }
}

export const readTodos = () => async (dispatch) => {
  try {
    // server에 post 달라고 요청하고 거기서 todos만 꺼내옴
    const { data } = await api.readPosts() // {data} = response

    console.log(data)
    const todos = []
    data.forEach((el) => {
      todos.push(el.todos)
    })
    console.log(todos)
    dispatch(readTodoAction()) // action dispatching
    // payload를 통해 data return
  } catch (error) {
    console.log(error.message)
  }
}
