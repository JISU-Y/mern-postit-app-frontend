import React, { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import uuid from "react-uuid"

import { addTodoAction, updateTodoAction } from "../../redux"

import styles from "./TodoForm.module.css"

const TodoForm = (props) => {
  const dispatch = useDispatch()
  const [postTodo, setPostTodo] = useState({
    todoText: props.isTodoEdit ? props.editTodo.todoText : "",
    todoDone: false,
    tempId: null,
  })

  const inputRef = useRef(null)

  const handleAddSubmit = (e) => {
    e.preventDefault()

    // input 비어있을 경우
    if (props.isEdit && (!postTodo.todoText || /^\s*$/.test(postTodo.todoText))) {
      props.openNoInputModal()
      return
    }

    // 지금 state에 있는 post의 todos 수정해달라는 요청(여기서 사용자에게 입력받은 todo 전달)
    dispatch(addTodoAction({ ...postTodo, tempId: uuid() }))

    // Input 초기화
    setPostTodo({
      todoText: "",
      todoDone: false,
      tempId: null,
    })
  }

  const handleUpdateSubmit = (e) => {
    e.preventDefault()

    // 알림
    if (props.isEdit && (!postTodo.todoText || /^\s*$/.test(postTodo.todoText))) {
      props.openNoInputModal()
      return
    }

    dispatch(
      updateTodoAction(props.editTodo._id ?? props.editTodo.tempId, {
        ...props.editTodo,
        todoText: postTodo.todoText,
      })
    )

    // Input 초기화
    setPostTodo({
      todoText: "",
      todoDone: false,
      tempId: null,
    })
    props.handleEditTodoDone() // edit 끝났으면 다시 add todo 버튼 나오도록 초기화
  }

  return props.isTodoEdit ? (
    <form autoComplete="off" className={styles.todoForm} onSubmit={handleUpdateSubmit}>
      <input
        className={`${styles.todoInput} ${styles.edit}`}
        type="text"
        placeholder="Update your item"
        value={postTodo.todoText}
        name="text"
        onChange={(e) => setPostTodo({ ...postTodo, todoText: e.target.value })}
        ref={inputRef}
      />
      <button className={`${styles.todoBtn} ${styles.edit}`} type="submit">
        Update
      </button>
    </form>
  ) : (
    <form autoComplete="off" className={styles.todoForm} onSubmit={handleAddSubmit}>
      <input
        className={styles.todoInput}
        type="text"
        placeholder="Add a todo"
        value={postTodo.todoText}
        name="text"
        onChange={(e) => setPostTodo({ ...postTodo, todoText: e.target.value })}
        ref={inputRef}
      />
      <button className={styles.todoBtn} type="submit">
        Add todo
      </button>
    </form>
  )
}

export default TodoForm
