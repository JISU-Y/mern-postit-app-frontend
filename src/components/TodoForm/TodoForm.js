import React, { useState, useRef } from "react"

import styles from "./TodoForm.module.css"

// todo form
const TodoForm = (props) => {
  const [postTodo, setPostTodo] = useState({
    todoText: "",
    todoDone: false,
  })

  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    // 알림
    if (postTodo.todoText === "") {
      if (props.isEdit || props.post.id === 0) {
        props.openNoInputModal()
      }
    }

    props.onSubmit({
      todoText: postTodo.todoText,
      todoDone: false,
    })

    // Input 초기화
    setPostTodo({
      todoText: "",
      todoDone: false,
    })
  }

  return (
    <form autoComplete="off" className={styles.todoForm} onSubmit={handleSubmit}>
      {props.edit ? (
        <>
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
        </>
      ) : (
        <>
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
        </>
      )}
    </form>
  )
}

export default TodoForm
