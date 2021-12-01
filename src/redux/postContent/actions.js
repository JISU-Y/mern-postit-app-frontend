import { READ_POST, ADD_TODO, UPDATE_TODO, DELETE_TODO, ADD_TAG, DELETE_TAG } from "./types"

// action creator
export const readPostContent = (post) => {
  return {
    type: READ_POST,
    payload: post,
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

export const addTagAction = (tagName) => {
  return {
    type: ADD_TAG,
    payload: tagName,
  }
}

export const deleteTagAction = (tagName) => {
  return {
    type: DELETE_TAG,
    payload: tagName,
  }
}
